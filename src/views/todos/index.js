import '../../style.css';
import Todo from './todo';
import AddTodo from './addtodo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Loading from '../../components/loading';
import FooterNavigation from './footerNavigation';
import { removeTokens } from '../../utils/tokenHandlers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SUCCESS, RESOURCE_CREATED } from '../../constants/statusCodes';
import { getAllTodos, postTodo, putTodo, deleteTodo } from '../../utils/api';
import { ALL, ACTIVE, COMPLETED, COMPLETE, INCOMPLETE } from '../../constants/todoConstants';
import { addTodo, setVisibility, removeTodo, changeText, toggleCheckBox } from '../../actions';

class Login extends Component {

    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        setVisibility: PropTypes.func.isRequired,
        removeTodo: PropTypes.func.isRequired,
        changeText: PropTypes.func.isRequired,
        toggleCheckBox: PropTypes.func.isRequired,
        todos: PropTypes.array.isRequired,
        visibility: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: ''
        }
    }

    async componentDidMount() {
      
        //getting the initial data from the server
        this.setState({ isLoading: true });
        try {
            const response = await getAllTodos();
            const { status, data } = response.data;
            if (status === SUCCESS) {
                this.setState({ isLoading: false });
                this.props.addTodo(data);
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    componentDidUpdate(){
        //if the user is not logged in escort them to the logi page
        if (!this.props.isLoggedIn) this.props.history.push('/login');
    }

    checkBoxClickHandler = async id => {
        const todos = this.props.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === id);
        const currentStatus = (todos[currentIndex].status === 'complete') ? 'incomplete' : 'complete';
        const modifiedTodo = { ...todos[currentIndex], status: currentStatus }


        //sync to the server
        this.setState({ isLoading: true });
        try {
            const { uuid, title } = this.props.todos[currentIndex];
            const response = await putTodo(uuid, title, currentStatus)

            //update the local state
            if (response.status === RESOURCE_CREATED) {
                this.props.toggleCheckBox(modifiedTodo, currentIndex);
                this.setState({ isLoading: false })
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }

    }

    textBoxChangeHandler = (uuid, title) => {
        this.props.changeText(uuid, title);
    }

    deleteTodoHandler = async uuid => {

        const todos = this.props.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);

        //sync to the server
        this.setState({ isLoading: true });
        try {
            //sync to the server
            const response = await deleteTodo(uuid);

            //update the local state
            if (response.status === RESOURCE_CREATED) {
                this.props.removeTodo(currentIndex);
                this.setState({ isLoading: false });
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    logoutHandler = () => {
        removeTokens();
        this.props.history.push('/login');
    }

    onSaveHandler = async id => {
        const todos = this.props.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === id);

        this.setState({ isLoading: true });
        try {
            //API call
            const { uuid, title, status } = todos[currentIndex];
            const response = await postTodo(uuid, title, status);

            //update the local state
            if (response.status === RESOURCE_CREATED) this.setState({ isLoading: false });

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }

    }

    addTodo = todo => {
        //update the local state
        const newTodo = [...this.props.todos, todo];
        this.props.addTodo(newTodo);
    }

    changeCurrentTab = tab => {
        this.props.setVisibility(tab);
    }

    render() {
        //checks what to show according to the navigation tab pressed
        let todosToShow;
        const todos = this.props.todos.slice().reverse();
        switch (this.props.visibility) {
            case ALL:
                todosToShow = todos;
                break;
            case ACTIVE:
                todosToShow = todos.filter(todo => (todo.status === INCOMPLETE));
                break;
            case COMPLETED:
                todosToShow = todos.filter(todo => (todo.status === COMPLETE));
                break;
            default:
                todosToShow = todos;
                break;
        }

        return (
            <>
                <div className='header'>
                    <span>Todos</span>
                    <button
                        className='logout-button'
                        onClick={() => this.logoutHandler()}
                    >
                        Logout
                    </button>
                </div>

                {(this.state.isLoading) && (< div className='spinner'>  <Loading /> </div>)}


                <div className="todos-container">
                    <p className='error'>{this.state.error}</p>
                    < div className='todos-list container'>

                        <MuiThemeProvider>
                            {todosToShow.map(todo => (
                                <Todo
                                    todo={todo}
                                    checkBoxClickHandler={this.checkBoxClickHandler}
                                    textBoxChangeHandler={this.textBoxChangeHandler}
                                    deleteTodoHandler={this.deleteTodoHandler}
                                    onSaveHandler={this.onSaveHandler}
                                />
                            ))}
                        </MuiThemeProvider>

                        <AddTodo addTodo={this.addTodo} />
                        <FooterNavigation currentTabHandler={this.changeCurrentTab} className='footer' />

                    </div >
                </div>
                }
            </>
        );
    }
}


const mapStateToProps = ({ todosList, visibilityFilter, status }) => ({
    todos: todosList.todos,
    visibility: visibilityFilter.visibility,
    isLoggedIn: status.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    addTodo: todo => { dispatch(addTodo(todo)) },
    setVisibility: visibility => { dispatch(setVisibility(visibility)) },
    removeTodo: currentIndex => { dispatch(removeTodo(currentIndex)) },
    changeText: (id, title) => { dispatch(changeText(id, title)) },
    toggleCheckBox: (modifiedTodo, currentIndex) => { dispatch(toggleCheckBox(modifiedTodo, currentIndex)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

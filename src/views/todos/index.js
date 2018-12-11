import '../../style.css';
import Todo from './todo';
import AddTodo from './addtodo';
import React, { Component } from "react";
import Loading from '../../components/loading';
import FooterNavigation from './footerNavigation';
import { removeTokens } from '../../utils/tokenHandlers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getAllTodos, postTodo, putTodo, deleteTodo } from '../../utils/api'
import { ALL, ACTIVE, COMPLETED, COMPLETE, INCOMPLETE } from '../../constants/todoConstants'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            currentTab: "Show All",
            isLoading: false,
            error: ''
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await getAllTodos();
            const { status, data } = response.data;
            if (status === 200) {
                this.setState({ todos: data, isLoading: false });
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    checkBoxClickHandler = (id) => {
        //update the local state
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === id);
        const currentStatus = (todos[currentIndex].status === 'complete') ? 'incomplete' : 'complete';
        const modifiedTodo = { ...todos[currentIndex], status: currentStatus }

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), modifiedTodo, ...prevState.todos.slice(currentIndex + 1)]
        }));

        //sync to the server
        const { uuid, title } = this.state.todos[currentIndex];
        putTodo(uuid, title, currentStatus)

    }

    textBoxChangeHandler = (uuid, title) => {
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);
        const modifiedTodo = { ...todos[currentIndex], title }
console.log(modifiedTodo)
        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), modifiedTodo, ...prevState.todos.slice(currentIndex + 1)]
        }));
    }

    deleteTodoHandler = (uuid) => {

        //update the local state

        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), ...prevState.todos.slice(currentIndex + 1)]
        }));

        //sync to the server
        deleteTodo(uuid)
    }


    logoutHandler = () => {
        removeTokens();
        this.props.history.push('/login');
    }

    onSaveHandler = (id) => {
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === id);

        //API call
        const { uuid, title, status } = todos[currentIndex];

        postTodo(uuid, title, status)
    }

    addTodo = (todo) => {
        //update the local state

        const newTodos = [...this.state.todos, todo];
        this.setState({ todos: newTodos });
    }

    changeCurrentTab = tab => {
        this.setState({ currentTab: tab });
    }

    render() {
        let todosToShow;
        const todos = this.state.todos.slice().reverse();
        switch (this.state.currentTab) {
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
                <div className="header">
                    <span>Todos</span>

                    <button
                        className="logout-button"
                        onClick={() => this.logoutHandler()}>
                        Logout
                 </button>
                </div>

                {(this.state.isLoading)
                    ?
                    <Loading />
                    :
                    <div>
                        <p className="error">{this.state.error}</p>
                        < div className="todos-list">
                            <div className="container">
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
                                <FooterNavigation currentTabHandler={this.changeCurrentTab} className="footer" />

                            </div>

                        </div >
                    </div>
                }
            </>
        );
    }
}

export default Login;
import '../../style.css';
import axios from 'axios';
import Todo from './todo';
import AddTodo from './addtodo';
import AppBar from 'material-ui/AppBar';
import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Loading from '../../components/loading';
import FooterNavigation from './footerNavigation';
import { getToken, removeTokens } from '../../utils/tokenHandlers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const BASE_URL = 'http://localhost:8848/api';

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
            const response = await axios.get(`${BASE_URL}/todos`, { 'headers': { 'access-token': getToken('accessToken') } });

            const { status, data } = response.data;
            if (status === 200) {
                this.setState({ todos: data, isLoading: false });
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    checkBoxClickHandler = async (id) => {
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
        axios.put(
            `${BASE_URL}/todos`,
            { uuid, title, status: currentStatus },
            { 'headers': { 'access-token': getToken('accessToken') } }
        );

    }

    textBoxChangeHandler = async (uuid, title) => {
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);
        const modifiedTodo = { ...todos[currentIndex], title }

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), modifiedTodo, ...prevState.todos.slice(currentIndex + 1)]
        }));
    }

    deleteTodoHandler = async (uuid) => {

        //update the local state

        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), ...prevState.todos.slice(currentIndex + 1)]
        }));

        //sync to the server
        axios.delete(
            `${BASE_URL}/todos/`,
            { data: { uuid }, 'headers': { 'access-token': getToken('accessToken') } }
        );
    }


    logoutHandler = () => {
        removeTokens();
        this.props.history.push('/login');
    }

    onSaveHandler = async (id) => {
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === id);

        //API call
        const { uuid, title, status } = todos[currentIndex];
        axios.post(
            `${BASE_URL}/todos/`,
            { uuid, title, status },
            { 'headers': { 'access-token': getToken('accessToken') } }
        );

    }

    addTodo = async (todo) => {
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
            case 'Show All':
                todosToShow = todos;
                break;
            case 'Show Active':
                todosToShow = todos.filter(todo => (todo.status === 'incomplete'));
                break;
            case 'Show Completed':
                todosToShow = todos.filter(todo => (todo.status === 'complete'));
                break;
            default:
                todosToShow = todos;
                break;
        }

        return (
            <>
                <MuiThemeProvider>
                    <AppBar title="Todos">
                        <Button style={{ color: '#fff' }} onClick={() => this.logoutHandler()}>Logout</Button>
                    </AppBar>
                </MuiThemeProvider>
                {(this.state.isLoading)
                    ?
                    <Loading />
                    :
                    < div >
                        <p className="error">{this.state.error}</p>
                        <MuiThemeProvider>
                            <div>
                                <Paper elevation={4} className="paper">

                                    {todosToShow.map(todo => (
                                        <Todo
                                            todo={todo}
                                            checkBoxClickHandler={this.checkBoxClickHandler}
                                            textBoxChangeHandler={this.textBoxChangeHandler}
                                            deleteTodoHandler={this.deleteTodoHandler}
                                            onSaveHandler={this.onSaveHandler}
                                        />
                                    ))}

                                    <AddTodo addTodo={this.addTodo} />
                                    <FooterNavigation currentTabHandler={this.changeCurrentTab} className="footer" />
                                </Paper>
                            </div>
                        </MuiThemeProvider>

                    </div >
                }
            </>
        );
    }
}

export default Login;
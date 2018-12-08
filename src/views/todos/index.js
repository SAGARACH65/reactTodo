import '../../style.css';
import Todo from './todo'
import AddTodo from './addtodo'
import AppBar from 'material-ui/AppBar';
import React, { Component } from "react";
import Paper from '@material-ui/core/Paper'
import FooterNavigation from './footerNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                title: 'asas',
                status: 'incomplete',
                uuid: 11
            }, {
                title: 'asas',
                status: 'incomplete',
                uuid: 12

            }, {
                title: 'asas',
                status: 'complete',
                uuid: 13

            }],

            currentTab: "Show All"
        }
    }

    componentDidMount() {

    }

    checkBoxClickHandler = uuid => {
        const todos = this.state.todos;

        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);

        const status = (todos[currentIndex].status === 'complete') ? 'incomplete' : 'complete';
        const modifiedTodo = { ...todos[currentIndex], status }

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), modifiedTodo, ...prevState.todos.slice(currentIndex + 1)]
        }));
    }

    textBoxChangeHandler = (uuid, title) => {
        const todos = this.state.todos;

        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);

        const modifiedTodo = { ...todos[currentIndex], title }

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), modifiedTodo, ...prevState.todos.slice(currentIndex + 1)]
        }));
    }

    deleteTodoHandler = uuid => {
        const todos = this.state.todos;
        const currentIndex = todos.findIndex(todo => todo.uuid === uuid);
        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0, currentIndex), ...prevState.todos.slice(currentIndex + 1)]
        }));
    }

    onSaveHandler = uuid => {
        //API call
    }

    addTodo = todo => {
        const newTodos = [...this.state.todos, todo];
        this.setState({ todos: newTodos });
    }

    changeCurrentTab = tab => {
        this.setState({ currentTab: tab });
    }

    render() {
        let todosToShow;
        const todos = this.state.todos;
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
            <div  >
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Todos"
                        />
                        <Paper elevation={4} className="paper">

                            {todosToShow.map(todo => (
                                <Todo
                                    todo={todo}
                                    checkBoxClickHandler={this.checkBoxClickHandler}
                                    textBoxChangeHandler={this.textBoxChangeHandler}
                                    deleteTodoHandler={this.deleteTodoHandler}
                                />
                            ))}

                            <AddTodo addTodo={this.addTodo} />
                            <FooterNavigation currentTabHandler={this.changeCurrentTab} className="footer" />
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;
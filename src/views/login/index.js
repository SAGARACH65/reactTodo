import '../../style.css'
import axios from 'axios'
import AppBar from 'material-ui/AppBar';
import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import Loading from '../../components/loading'
import RaisedButton from 'material-ui/RaisedButton';
import { storeToken, getToken } from '../../utils/storeTokens'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            isLoading: false
        }
    }

    componentDidMount() {
        if (getToken('refreshToken')) {
            this.props.history.push('/todos');
        }
    }

    async  handleClick(event) {
        this.setState({ isLoading: true })
        try {

            const response = await axios.post('http://localhost:8848/api/users/login', {
                username: this.state.username,
                password: this.state.password
            });

            const data = response.data;

            if (data.status === 200) {
                if (data.message === "invalid password") {
                    this.setState({ error: 'Wrong username or password', isLoading: false });
                } else {

                    storeToken(data.refreshToken, 'refreshToken');
                    storeToken(data.accessToken, 'accessToken');

                    this.props.history.push('/todos');
                }
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    render() {
        return (
            <div  >
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <div style={{ marginLeft: 800 }}>

                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />

                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />

                            <p className="error">{this.state.error}</p>

                            {(this.state.isLoading) && <Loading />}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    marginLeft: 95,
};
export default Login;
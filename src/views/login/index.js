import '../../style.css';
import { login } from '../../utils/api';
import React, { Component } from 'react';
import Loading from '../../components/loading';
import { storeToken, getToken } from '../../utils/tokenHandlers';
import { SUCCESS, UNAUTHORIZED } from '../../constants/statusCodes';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../constants/todoConstants';

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
        if (getToken(REFRESH_TOKEN)) {
            this.props.history.push('/todos');
        }
    }

    async handleClick(event) {

        this.setState({ isLoading: true })
        const { username, password } = this.state;
        try {
            const response = await login(username, password);

            const { status, message, refreshToken, accessToken } = response.data;

            if (status === UNAUTHORIZED) {
                this.setState({ error: 'Wrong username or password', isLoading: false });
            }

            if (status === SUCCESS) {
                storeToken(refreshToken, REFRESH_TOKEN);
                storeToken(accessToken, ACCESS_TOKEN);
                this.props.history.push('/todos');
            }

        } catch (error) {
            this.setState({ error: 'Network Issue', isLoading: false });
        }
    }

    render() {
        return (
            <div  >
                <div>
                    <p className='header'>Login</p>

                    <div style={{ marginLeft: 850 }}>

                        <input
                            type='text'
                            placeholder='Enter your Username'
                            onChange={event => this.setState({ username: event.target.value })}
                            border='none'
                            className='input-field'
                        />
                        <br />

                        <input
                            type='password'
                            placeholder='Enter your Password'
                            onChange={event => this.setState({ password: event.target.value })}
                            border='none'
                            className='input-field'
                        />

                        <br />

                        <button
                            label='Submit'
                            className='submit-button'
                            onClick={(event) => this.handleClick(event)}
                        >
                            SUBMIT
                            </button>

                        <p className='error'>{this.state.error}</p>

                        {(this.state.isLoading) && <Loading className='spinner' />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
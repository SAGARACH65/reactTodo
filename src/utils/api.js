import axios from 'axios';
import history from './history'
import { withRouter } from 'react-router-dom'
import { getToken, storeToken } from './tokenHandlers';

const BASE_URL = 'http://localhost:8848/api';

const getAccessToken = async () => {
    return axios.get(`${BASE_URL}/users/getNewToken`, { 'headers': { 'refresh-token': getToken('refreshToken') } });
}

let authTokenRequest;
// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
function getAuthToken() {
    if (!authTokenRequest) {
        authTokenRequest = getAccessToken();

        //either  if it is rejected or resolved reset the authTOkenRequest to null
        authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
    }
    return authTokenRequest;
}

function resetAuthTokenRequest() {
    authTokenRequest = null;
}


axios.interceptors.response.use(response => {
    return response;
}, error => {

    const originalRequest = error.config;

    if (error.response.status === 401) {
    }

    if (error.response.status === 403) {
        getAuthToken().then(response => {
            storeToken(response.data.accessToken, 'accessToken');
            originalRequest.headers['access-token'] = response.data.accessToken
            axios(originalRequest);
        });
    }
})


export const getAllTodos = async () => {
    return await axios.get(`${BASE_URL}/todos`, { 'headers': { 'access-token': getToken('accessToken') } });
}

export const postTodo = (uuid, title, status) => {
    axios.post(
        `${BASE_URL}/todos`,
        { uuid, title, status },
        { 'headers': { 'access-token': getToken('accessToken') } }
    );
}


export const putTodo = (uuid, title, status) => {
    axios.put(
        `${BASE_URL}/todos`,
        { uuid, title, status },
        { 'headers': { 'access-token': getToken('accessToken') } }
    );
}


export const deleteTodo = uuid => {
    axios.delete(
        `${BASE_URL}/todos/`,
        { data: { uuid }, 'headers': { 'access-token': getToken('accessToken') } }
    );
}

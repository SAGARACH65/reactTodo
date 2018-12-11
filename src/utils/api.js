import axios from 'axios';
import { store } from '../store';
import { setLoggedInStatus } from '../actions';
import { getToken, storeToken, removeTokens } from './tokenHandlers';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants/todoConstants';
import { ACCESS_TOKEN_INVALID, UNAUTHORIZED } from '../constants/statusCodes';

const BASE_URL = 'http://localhost:8848/api';

const getAccessToken = async () => {
    return axios.get(`${BASE_URL}/users/getNewToken`, { 'headers': { 'refresh-token': getToken(REFRESH_TOKEN) } });
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

    if (error.response.status === UNAUTHORIZED) {
        removeTokens();
        store.dispatch(setLoggedInStatus(false));
    }

    if (error.response.status === ACCESS_TOKEN_INVALID) {
        getAuthToken().then(response => {
            storeToken(response.data.accessToken, ACCESS_TOKEN);
            originalRequest.headers['access-token'] = response.data.accessToken
            axios(originalRequest);
        });
    }
})


export const getAllTodos = async () => {
    return await axios.get(`${BASE_URL}/todos`, { 'headers': { 'access-token': getToken(ACCESS_TOKEN) } });
}

export const postTodo = (uuid, title, status) => {
    return axios.post(
        `${BASE_URL}/todos`,
        { uuid, title, status },
        { 'headers': { 'access-token': getToken(ACCESS_TOKEN) } }
    );
}


export const putTodo = (uuid, title, status) => {
    return axios.put(
        `${BASE_URL}/todos`,
        { uuid, title, status },
        { 'headers': { 'access-token': getToken(ACCESS_TOKEN) } }
    );
}


export const deleteTodo = uuid => {
    return axios.delete(
        `${BASE_URL}/todos/`,
        { data: { uuid }, 'headers': { 'access-token': getToken(ACCESS_TOKEN) } }
    );
}

export const login = (username, password) => {
    return axios.post(`${BASE_URL}/users/login`, {
        username,
        password
    });
}

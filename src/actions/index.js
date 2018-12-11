export const ADD_TODO = 'ADD_COMMENTS';
export const REMOVE_TODO = 'ADD_STORIES';
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const SET_VISIBILITY = 'SET_VISIBILITY';
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const LOGIN_STATUS = 'LOGIN_STATUS';

export const addTodo = todo => ({
    type: ADD_TODO,
    payload: { todo }
});

export const setVisibility = visibility => ({
    type: SET_VISIBILITY,
    payload: { visibility }
});

export const setLoggedInStatus = isLoggedIn => ({
    type: LOGIN_STATUS,
    payload: { isLoggedIn }
});

export const removeTodo = currentIndex => ({
    type: REMOVE_TODO,
    payload: { currentIndex }
});

export const changeText = (id, title) => ({
    type: CHANGE_TEXT,
    payload: { id, title }
});

export const toggleCheckBox = (modifiedTodo, currentIndex) => ({
    type: TOGGLE_CHECKBOX,
    payload: { modifiedTodo, currentIndex }
});
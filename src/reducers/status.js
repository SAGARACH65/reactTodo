
import {
    LOGIN_STATUS
} from '../actions';

const INITIAL_STATE = {
    isLoggedIn: true
};

const status = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };

        default:
            return state;
    }
}

export default status;
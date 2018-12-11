import {
    SET_VISIBILITY
} from '../actions';

const INITIAL_STATE = {
    visibility: 'Show All'
};

const visibilityFilter = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload.visibility
            };

        default:
            return state;
    }
}

export default visibilityFilter;
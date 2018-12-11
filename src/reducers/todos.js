import {
    ADD_TODO,
    REMOVE_TODO,
    CHANGE_TEXT,
    TOGGLE_CHECKBOX
} from '../actions';

const INITIAL_STATE = {
    todos: []
};

const todoList = (state = INITIAL_STATE, action) => {
    const todos = state.todos;

    switch (action.type) {


        case REMOVE_TODO:
            {
                const { currentIndex } = action.payload;

                return {
                    ...state,
                    todos: [
                        ...todos.slice(0, currentIndex),
                        ...todos.slice(currentIndex + 1)
                    ]
                };
            }

        case CHANGE_TEXT:
            {
                const { title, id } = action.payload;
                const currentIndex = todos.findIndex(todo => todo.uuid === id);
                const modifiedTodo = { ...todos[currentIndex], title }

                return {
                    ...state,
                    todos: [
                        ...todos.slice(0, currentIndex),
                        modifiedTodo,
                        ...todos.slice(currentIndex + 1)
                    ]
                }
            }

        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...action.payload.todo
                ]
            };


        case TOGGLE_CHECKBOX:
            {
                const { currentIndex, modifiedTodo } = action.payload;
                return {
                    ...state,
                    todos: [
                        ...todos.slice(0, currentIndex),
                        modifiedTodo,
                        ...todos.slice(currentIndex + 1)
                    ]
                }
            }

        default:
            return state;

    }
}

export default todoList;
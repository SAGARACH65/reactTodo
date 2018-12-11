import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { COMPLETE } from '../../constants/todoConstants';

export default function Todo(props) {
    const { uuid, status, title } = props.todo;

    const { checkBoxClickHandler, textBoxChangeHandler, deleteTodoHandler, onSaveHandler } = props;

    return (

        <div className='todo-container'>
            <Checkbox
                checked={(status === COMPLETE) ? true : false}
                key={+ 'cb'}
                onChange={() => checkBoxClickHandler(uuid)}
                value='checkedB' />

            {/*  <input
                    type='checkbox'
                     className='checkBox'
                     checked={(status === COMPLETE) ? true : false}
                     onChange={() => checkBoxClickHandler(uuid)}

                 />  */}


            <input
                type='text'
                onChange={event => textBoxChangeHandler(uuid, event.target.value)}
                value={title}
                className='input-todo'
            />

            <button className='icon-buttons'
                aria-label='Delete'
                onClick={() => deleteTodoHandler(uuid)}
            >
                <DeleteIcon fontSize='small' />
            </button>

            <button className='icon-buttons'
                aria-label='Save'
                onClick={() => onSaveHandler(uuid)}
            >
                <SaveIcon fontSize='small' />

            </button>

        </div>

    );
}


Todo.propTypes = {
    uuid: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checkBoxClickHandler: PropTypes.func.isRequired,
    textBoxChangeHandler: PropTypes.func.isRequired,
    deleteTodoHandler: PropTypes.func.isRequired,
    onSaveHandler: PropTypes.func.isRequired
}



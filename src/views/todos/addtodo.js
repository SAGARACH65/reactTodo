import '../../style.css'
import React from 'react'
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { INCOMPLETE } from '../../constants/todoConstants'

export default function AddTodo(props) {
    return (
        <div className='floating-button-container'>
            <button
                className='floatingButton'
                onClick={() => props.addTodo({ status: INCOMPLETE, title: '', uuid: uuidv1() })}
            >
                <AddIcon />
            </button>
        </div>
    )
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}


import '../../style.css'
import React from 'react'
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { INCOMPLETE } from '../../constants/todoConstants'

export default function AddTodo(props) {
    return (
        <div style={{ marginLeft: 600 }}>
            <button
                className="floatingButton"
                onClick={() => props.addTodo({ status: INCOMPLETE, text: '', uuid: uuidv1() })}
            >
                <AddIcon />
            </button>
        </div>
    )
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}


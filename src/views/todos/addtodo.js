import React from 'react'
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export default function AddTodo(props) {
    return (
        <div style={{ marginLeft: 600 }}>
            <Button
                variant="fab"
                color="primary"
                aria-label="add"
                onClick={() => props.addTodo({ status: 'incomplete', text: '', uuid: uuidv1() })}
            >
                <AddIcon />
            </Button>
        </div>
    )
}

AddTodo.propTypes={
    addTodo:PropTypes.func.isRequired
}


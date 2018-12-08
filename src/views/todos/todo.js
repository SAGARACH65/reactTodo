import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

export default function Todo(props) {
    const { uuid, status, title } = props.todo;
    const { checkBoxClickHandler, textBoxChangeHandler, deleteTodoHandler, onSaveHandler } = props;

    return (
        <div >
            <ListItem
                disabled
                key={uuid}>

                <Checkbox
                    checked={(status === 'complete') ? true : false}
                    key={+ 'cb'}
                    onChange={() => checkBoxClickHandler(uuid)}
                    value="checkedB" />

                <TextField
                    //textbox will be disabled if to-do is checked
                    disabled={(status === 'complete') ? true : false}
                    fullWidth
                    style={{ width: 520 }}
                    key={uuid + 'tf'}
                    value={title}
                    onChange={event => textBoxChangeHandler(uuid, event.target.value)}
                    margin="normal" />

                <IconButton
                    aria-label="Delete"
                    onClick={() => deleteTodoHandler(uuid)}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>

                <IconButton
                    aria-label="Save"
                    onClick={() => onSaveHandler(uuid)}
                >
                    <SaveIcon fontSize="small" />

                </IconButton>

            </ListItem>
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



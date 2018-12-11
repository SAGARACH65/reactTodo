import React from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/DoneAll';
import FlipIcon from '@material-ui/icons/FlipToFront';
import DescIcon from '@material-ui/icons/Description';
import { ALL, ACTIVE, COMPLETED } from '../../constants/todoConstants'


export default function footerNavigation(props) {
    return (
        <div >


            <button
                className='nav-buttons'
                aria-label='Save'
                onClick={() => {
                    props.currentTabHandler(ALL)
                }}
            >
                <DescIcon fontSize='small' />
                <p>Show All</p>
            </button>

            <button
                className='nav-buttons'
                aria-label='Save'
                onClick={() =>
                    props.currentTabHandler(ACTIVE)
                }
            >
                <FlipIcon fontSize='small' />
                <p>Show Active</p>

            </button>

            <button
                className='nav-buttons'
                aria-label='Save'
                onClick={() =>
                    props.currentTabHandler(COMPLETED)
                }
            >
                <DoneIcon fontSize='small' />
                <p>Show Completed </p>

            </button>
        </div>
    )
}

footerNavigation.propTypes = {
    currentTabHandler: PropTypes.func.isRequired,

}

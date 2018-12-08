import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/DoneAll';
import FlipIcon from '@material-ui/icons/FlipToFront';
import DescIcon from '@material-ui/icons/Description';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import React from 'react'

export default function footerNavigation(props) {
    return (
        <div >
            <BottomNavigation showLabels>
                <BottomNavigationAction

                    onClick={() => {
                        props.currentTabHandler('Show All')
                    }}
                    label="Show All" icon={<DescIcon />} />
                <BottomNavigationAction
                    onClick={() =>
                       props.currentTabHandler('Show Active')
                    }
                    label="Show Active"
                    icon={<FlipIcon />} />
                <BottomNavigationAction

                    onClick={() =>
                        props.currentTabHandler('Show Completed')
                    }
                    label="Show Completed"
                    icon={<DoneIcon />} />

            </BottomNavigation>
        </div>
    )
}

footerNavigation.propTypes = {
    currentTabHandler: PropTypes.func.isRequired,
    
  }

import React from 'react';
import {FaBars} from 'react-icons/fa';
import {toggleSidebar} from '../../redux/headerToggle/headerToggle.actions';
import {connect} from 'react-redux'

const Header = ({toggleSidebar}) => {
    return (
        <div>
            <FaBars onClick={toggleSidebar} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebar())
})

export default connect(null, mapDispatchToProps)(Header);
import React from 'react';
import {FaBars} from 'react-icons/fa';
import {toggleSidebar} from '../../redux/headerToggle/headerToggle.actions';
import {connect} from 'react-redux'
import * as s from './Header.styles'

const Header = ({toggleSidebar}) => {
    return (
        <s.HeaderContainer>
            <s.Toggle>
                <FaBars onClick={toggleSidebar}/> 
            </s.Toggle>
            <s.SearchInput>Search...</s.SearchInput>
        </s.HeaderContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebar())
})

export default connect(null, mapDispatchToProps)(Header);
import React from 'react';
import {FaBars} from 'react-icons/fa';
import {toggleSidebar} from '../../redux/headerToggle/headerToggle.actions';
import {connect} from 'react-redux'
import {
    HeaderContainer,
    Toggle,
    OptionsContainer,
    OptionLink,
    SearchInput
} from './Header.styles'

const Header = ({toggleSidebar}) => {
    return (
        <HeaderContainer>
            <Toggle>
                <FaBars onClick={toggleSidebar}/> 
            </Toggle>
            <SearchInput>Search...</SearchInput>
            <OptionsContainer>
                <OptionLink>Account</OptionLink>
            </OptionsContainer>
        </HeaderContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebar())
})

export default connect(null, mapDispatchToProps)(Header);
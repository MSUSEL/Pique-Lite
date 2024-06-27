import React from 'react';
import { FaBars } from 'react-icons/fa';

import {
    HeaderContainer,
    Toggle,
    SearchInput,
    OptionsContainer,
    OptionLink
} from './Header.styles';

const Header = () => {
    return (
        <HeaderContainer>
            <Toggle>
                <FaBars />
            </Toggle>
            <SearchInput placeholder="Search..." />
            <OptionsContainer>
                <OptionLink>Account</OptionLink>
            </OptionsContainer>
        </HeaderContainer>
    );
}

export default Header;

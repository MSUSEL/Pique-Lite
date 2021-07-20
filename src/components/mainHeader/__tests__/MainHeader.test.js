import React from 'react';
import {shallow} from 'enzyme';

import MainHeader from '../MainHeader.component'

describe('MainHeader Component', () => {
    let wrapper;
    wrapper = shallow(<MainHeader/>);

    it('should render MainHeader component', () => {
        expect(wrapper).toMatchSnapshot();
    })
})
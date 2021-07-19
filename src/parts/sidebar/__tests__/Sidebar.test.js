import React from 'react';
import {shallow} from 'enzyme';

import Sidebar from '../Sidebar.component';

describe('Sidebar Component', () => {
    let wrapper;
    wrapper = shallow(<Sidebar/>).dive();

    it('should render Sidebar component', () => {
        expect(wrapper).toMatchSnapshot();
    })
})
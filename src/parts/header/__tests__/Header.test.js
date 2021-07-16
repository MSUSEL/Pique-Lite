import Header from "../Header.component";
import {shallow} from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const initStore = {
    toggle: true
}
// a mock redux store is created 
const mockStore = configureStore();
const store = mockStore(initStore);

describe('Header Component', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <Header/>
        </Provider>
    );
    test('should render correctly with default props and redux store', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
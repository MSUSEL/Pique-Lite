import React from 'react'
import MainView from '../Mainview.component'
import { shallow} from 'enzyme';

import Dashboard from '../../../pages/dashboardPage/Dashboard.component'
import Settings from '../../../pages/settingsPage/Settings.component';
import Visualize from '../../../pages/visualizePage/Visualize.component';
import Define from '../../../pages/visualizePage/definePage/Define.component';
import Calibrate from '../../../pages/visualizePage/calibrate/Calibrate.component';
import Evaluate from '../../../pages/visualizePage/evaluate/Evaluate.component';
import Assess from '../../../pages/visualizePage/assess/Assess.component';

let pathMap = {};

describe('Mainview routes using an array of routers', () => {
    beforeAll(() => {
        const component = shallow(<MainView/>);
        pathMap = component.find('Route').reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
    })

    it('should render dashboard page for / router', () => {
        expect(pathMap['/']).toBe(Dashboard);
    })
    it('should render the setting page for /settings', () => {
        expect(pathMap['/settings']).toBe(Settings)
    })
    it('should render the visualize page for /visualize', () => {
        expect(pathMap['/visualize']).toBe(Visualize)
    })
    it('should render the define page for /define', () => {
        expect(pathMap['/define']).toBe(Define)
    })
    it('should render the calibrate page for /calibrate', () => {
        expect(pathMap['/calibrate']).toBe(Calibrate)
    })
    it('should render the evaluate page for /evaluate', () => {
        expect(pathMap['/evaluate']).toBe(Evaluate)
    })
    it('should render the assess page for /assess', () => {
        expect(pathMap['/assess']).toBe(Assess)
    })
    
})

import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { MainViewGrid } from './MainView.styles';
import Dashboard from '../../pages/dashboardPage/Dashboard.component';
import Visualize from '../../pages/visualizePage/Visualize.component';
import Settings from '../../pages/settingsPage/Settings.component';
import Projects from '../../pages/projectsPage/Projects.component';
import Define from '../../pages/visualizePage/definePage/Define.component';
import Calibrate from '../../pages/visualizePage/calibrate/Calibrate.component';
import Evaluate from '../../pages/visualizePage/evaluate/Evaluate.component';
import Assess from '../../pages/visualizePage/assess/Assess.component';

const MainView = () => {
    return(
        <MainViewGrid>
           <Switch>
              <Route exact path='/' component={Dashboard}/>
              <Route exact path='/visualize' component={Visualize}/>
              <Route exact path='/define' component={Define}/>
              <Route exact path='/calibrate' component={Calibrate}/>
              <Route exact path='/evaluate' component={Evaluate}/>
              <Route exact path='/assess' component={Assess}/>
              <Route exact path='/settings' component={Settings}/>
              <Route exact path='/projects' component={Projects}/>
           </Switch>
        </MainViewGrid>
    )
}

export default MainView;
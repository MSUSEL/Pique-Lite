import React from 'react';
import * as s from './App.styles';
import Header from './parts/header/Header.component';
import Sidebar from './parts/sidebar/Sidebar.component';
import MainView from './parts/mainview/Mainview.component';

const App = () => {
  return (
    <s.AppContainer>
      <s.Headernav><Header /></s.Headernav>
      <s.Sidenav><Sidebar /></s.Sidenav>
      <s.MainView><MainView /></s.MainView>
      <s.FooterContainer />
    </s.AppContainer>
  );
};

export default App;

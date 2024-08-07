import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as s from './App.styles'
import Header from './parts/header/Header.component'
import { selectHeaderToggle } from './redux/headerToggle/headerToggle.selector'
import ViewportProvider from './ViewportContext'
import Sidebar from './parts/sidebar/Sidebar.component'
import MainView from './parts/mainview/Mainview.component';

const App = ({toggle}) => {
  return (
      <s.AppGrid hidden={toggle}>
        <s.Headernav><Header/></s.Headernav>
         <s.Sidenav><Sidebar/></s.Sidenav>
        <s.Mainview><MainView/></s.Mainview>
        <s.FooterContainer></s.FooterContainer>
      </s.AppGrid>
  )
}

const mapStateToProps = createStructuredSelector({
  toggle: selectHeaderToggle
})

export default connect(mapStateToProps)(App);
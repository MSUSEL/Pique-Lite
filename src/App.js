import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as s from './App.styles'
import Header from './parts/header/Header.component'
import { selectHeaderToggle } from './redux/headerToggle/headerToggle.selector'
import ViewportProvider from './ViewportContext'
import Sidebar from './parts/sidebar/Sidebar.component'
const App = ({toggle}) => {
  return (
    <ViewportProvider>
      <s.AppGrid hidden={toggle}>
        <s.Headernav><Header/></s.Headernav>
          {toggle ? null : <s.Sidenav><Sidebar/></s.Sidenav>}
        <s.Mainview></s.Mainview>
        <s.FooterContainer></s.FooterContainer>
      </s.AppGrid>
    </ViewportProvider>
  )
}

const mapStateToProps = createStructuredSelector({
  toggle: selectHeaderToggle
})

export default connect(mapStateToProps)(App);
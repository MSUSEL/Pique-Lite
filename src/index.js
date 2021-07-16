import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'

const MyAppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(
  <MyAppWithStore/>,
  document.getElementById('root')
);

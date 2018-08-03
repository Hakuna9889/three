import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import './scss/main.scss';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

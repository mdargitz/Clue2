import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Provider store={store}>
    <h1>cool</h1>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
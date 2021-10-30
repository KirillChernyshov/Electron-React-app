import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import ProcessDataView from './components/ProcessDataView';

ReactDom.render(
  <Provider store={store}>
    <ProcessDataView />
  </Provider>,
  document.getElementById('root'),
);


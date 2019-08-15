import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import CONFIG from './config';

// Router fix : https://github.com/facebook/create-react-app/issues/1765

ReactDOM.render(
  <BrowserRouter basename={CONFIG.appPath}>
    <Route path="/:serverName" exact component={App} />
    <Route path="/" exact component={App} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

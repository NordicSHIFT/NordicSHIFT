// index.js 
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App'; 
import { Router, Route, hashHistory } from 'react-router'

import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('content'));


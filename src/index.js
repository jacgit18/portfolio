import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Hello from './test/HelloTest';
import CardList from './Components/CardList';
import 'tachyons';
import { robots } from './Components/robots'; // must destructure since not exporting default

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <Hello welcome = "he whats up"  /> */}
 

    <CardList robots={robots}/>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

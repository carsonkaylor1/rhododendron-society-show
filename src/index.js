import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
require('dotenv').config();


// var firebaseConfig = {
//   apiKey: "AIzaSyAfnY7HaBl0NkqSSSvwxsQkjneTXDqe-DM",
//   authDomain: "rhododendron-club.firebaseapp.com",
//   databaseURL: "https://rhododendron-club.firebaseio.com",
//   projectId: "rhododendron-club",
//   storageBucket: "rhododendron-club.appspot.com",
//   messagingSenderId: "846020634194",
//   appId: "1:846020634194:web:47747ce18cd55b78dba18b",
//   measurementId: "G-4GZ370GHHY"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

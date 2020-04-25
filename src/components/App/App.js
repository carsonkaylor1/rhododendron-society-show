import React from 'react';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from '../Main'
import './App.css';

function App() {
  return (
    <Router>
      <Layout fixedHeader>
      
      <Content>
        <Main />
      </Content>
      <div id='footer-div'>  
        <p>Carson Kaylor Web Solutions</p>
        <p>240-457-2278</p>
        <p><a href="mailto:carsonkaylor@gmail.com">
        carsonkaylor@gmail.com</a></p>
        <p>carsonkaylor.netlify.com</p>       
      </div>
      </Layout>
    </Router>
  );
}

export default App;

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
      </Layout>
    </Router>
  );
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import HomePage from  './HomePage/HomePage';
import SignUpPage from './SignUpPage/SignUpPage';
import Photos from './Photos/Photos';
import LandingPage from './LandingPage/LandingPage';
import Awards from './Awards/Awards';
import SpecialAwards from './SpecialAwards/SpecialAwards'

const Main = () => (
    <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/signup' component={SignUpPage} />
        {/* <Route exact path='/home' component={HomePage} /> */}
        <Route exact path='/landingpage' component={LandingPage} />
        {/* <Route exact path='/photos' component={Photos} /> */}
        <Route exact path='/awards' component={Awards} />
        <Route exact path='/specialawards' component={SpecialAwards} />
    </Switch>
)

export default Main;
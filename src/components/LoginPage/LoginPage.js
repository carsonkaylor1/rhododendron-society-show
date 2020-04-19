import React from 'react';
import { Textfield, Button, Grid, Cell, Layout, Navigation, Header} from 'react-mdl';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase, { auth } from '../../firebase.js';
import HomePage from '../HomePage/HomePage';
import './LoginPage.css';
require('firebase/auth');

const txtUsername = document.getElementById("txtUsername");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");

class LoginPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            txtUsername: '',
            txtPassword: ''
        };

        this.login = this.login.bind(this);
        // this.signup = this.signup.bind(this);
        // this.signout = this.signout.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    login(){
        const promise = auth.signInWithEmailAndPassword(this.state.txtUsername, this.state.txtPassword);
        promise.catch(e => document.getElementById("error-message").innerText = e.message);
    }

    // signup(){
    //     // const promise = auth.createUserWithEmailAndPassword(this.state.txtUsername, this.state.txtPassword);
    //     // promise.catch(e => document.getElementById("error-message").innerText = e.message);
    //     window.location.pathname = "/signup";

    // }

    // signout(){
    //     auth.signOut();
    // }

    componentDidMount(){
        auth.onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                // document.getElementById("btnSignout").style.display = 'block';
                window.location.pathname = "https://rhododendron-show.netlify.app/landingpage";
            }
            else{
                console.log("not logged in");
                // document.getElementById("btnSignout").style.display = 'none';
            }
        })
    }

    handleTermChange(event){
        console.log("term change");
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    render(){
        return(
            <div>
            <Layout>
                <Header title=' ' id='header-bar' scroll>
                    <Navigation>
                        <Link to='/signup'>Sign Up</Link>
                        {/* <a href='/signup'></a> */}
                    </Navigation>
                </Header>
            
            <div id="login-container">
                <Grid id="site-title">
                    <Cell col={12}>
                        <div className="login-header">
                            <h2 style={{marginBottom: '50px', fontFamily: 'Merriweather serif', textDecoration: 'underline'}}>MASON DIXON CHAPTER</h2>
                            <h1 style={{fontFamily: 'Merriweather serif'}}>2020 Rhododendron & Azalea Truss Show</h1>
                            <img src='https://scholar.lib.vt.edu/ejournals/JARS/logo.gif'/>
                        </div>
                    </Cell>
                </Grid>
                <div id="username-container">
                <Textfield
                    id="txtUsername"
                    onChange={this.handleTermChange}
                    label="Username"
                    floatingLabel
                    style={{width: '200px'}}>
                </Textfield>
                </div>
                <div id="password-container">
                <Textfield
                    id="txtPassword"
                    type='password'
                    onChange={this.handleTermChange}
                    label="Password"
                    floatingLabel
                    style={{width: '200px'}}>
                </Textfield>
                </div>
                <div id="error-container">
                    <p id="error-message"></p>
                </div>
                <div id="button-container">
                    <Button id="btnLogin" onClick={this.login} raised colored>Login</Button>
                    {/* <Button id="btnSignout" onClick={this.signout} raised accent colored style={{display:'none'}}>Sign Out</Button> */}
                </div>
                
            </div>
            </Layout>
            </div>
        )
    }

    
}

export default LoginPage;
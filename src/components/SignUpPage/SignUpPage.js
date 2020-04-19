import React from 'react';
import { Textfield, Button, Layout, Header, Navigation } from 'react-mdl';
import firebase, { auth } from '../../firebase.js';
import './SignUpPage.css';
require('firebase/auth');

class SignUpPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            txtUsername: '',
            txtPassword: ''
        };

        this.signup = this.signup.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }


    signup(){
        const promise = auth.createUserWithEmailAndPassword(this.state.txtUsername, this.state.txtPassword);
        promise.catch(e => document.getElementById("error-message").innerText = e.message);
        //window.location.pathname = "/signup";
    }

    componentDidMount(){
        auth.onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                this.props.history.push('/landingpage');
            }
            else{
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
            <div className="signup-container">
                <Layout>
                <Header title=' ' id='header-bar' scroll>
                    <Navigation>
                        <a href='/'>Back</a>
                    </Navigation>
                </Header>
                <div className="header">
                    <h1 style={{fontFamily: 'Merriweather serif'}}>Sign Up Page</h1>
                </div>
             <div id="username-container">
                <Textfield
                    id="txtUsername"
                    onChange={this.handleTermChange}
                    label="Email"
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
                    <Button id="btnSignup" onClick={this.signup} raised primary colored>Sign Up</Button>
                </div>
                </Layout>
            </div>
        )
    }
}

export default SignUpPage;
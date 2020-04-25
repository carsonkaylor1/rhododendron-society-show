import React from 'react';
import firebase, { auth, storage, database } from '../../firebase.js';
import { Layout, Header, Button } from 'react-mdl';
import './Awards.css'
require('firebase/auth');

class Awards extends React.Component{
    constructor(props){
        super(props)

        this.goToHome = this.goToHome.bind(this);
    }

    

    componentDidMount(){
        const { category } = this.props.location.state;
        this.queryDatabase(category);
    }

    signout(){
        auth.signOut();
        window.location.pathname = "/";
    }

    goToHome(){
        this.props.history.push('/landingpage');
    }

    queryDatabase(category){
        database.ref('/' + category + '/awards/first/winner/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            if(currentObject){
            if(currentObject.author){
                var plantName = document.createElement('p');
                var winnerName = document.createElement('p');
                var image = document.createElement('img');

                document.getElementById('awards-indicator').style.display = 'none'
                document.getElementById('awards-div').style.display = 'block'
                plantName.innerHTML = ('Plant name: ' + currentObject.author.caption);
                winnerName.innerHTML = ('Submitted By: ' + currentObject.author.name);
                image.src = currentObject.author.url;
                plantName.style.marginTop = '25px';
                plantName.style.fontSize = '22px'
                winnerName.style.fontSize = '18px'
                image.style.maxWidth = '750px';
                image.style.maxHeight = '750px';

                document.getElementById('first-place-div').append(image);
                document.getElementById('first-place-div').append(plantName);
                document.getElementById('first-place-div').append(winnerName);
                
            }
            else{
                document.getElementById('awards-indicator').style.display = 'block'
                document.getElementById('awards-div').style.display = 'none'
            }
        }
        else{
            document.getElementById('awards-div').style.display = 'none'
        }


        });
        database.ref('/' + category + '/awards/second/winner/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            if(currentObject){
            if(currentObject.author)
            {
                var plantName = document.createElement('p');
                var winnerName = document.createElement('p');
                var image = document.createElement('img');

                plantName.innerHTML = ('Plant name: ' + currentObject.author.caption);
                winnerName.innerHTML = ('Winner name: ' + currentObject.author.name);
                image.src = currentObject.author.url;
                plantName.style.marginTop = '25px';
                plantName.style.fontSize = '22px';
                winnerName.style.fontSize = '18px';
                image.style.maxWidth = '750px';
                image.style.maxHeight = '750px';

                document.getElementById('second-place-div').append(image);
                document.getElementById('second-place-div').append(plantName);
                document.getElementById('second-place-div').append(winnerName);
                
            }
        }

        });
        database.ref('/' + category + '/awards/third/winner/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            if(currentObject){
            if(currentObject.author){
                var plantName = document.createElement('p');
                var winnerName = document.createElement('p');
                var image = document.createElement('img');

                plantName.innerHTML = ('Plant name: ' + currentObject.author.caption);
                winnerName.innerHTML = ('Winner name: ' + currentObject.author.name);
                image.src = currentObject.author.url;
                plantName.style.marginTop = '25px';
                plantName.style.fontSize = '22px';
                winnerName.style.fontSize = '18px';
                image.style.maxWidth = '750px';
                image.style.maxHeight = '750px';

                document.getElementById('third-place-div').append(image);
                document.getElementById('third-place-div').append(plantName);
                document.getElementById('third-place-div').append(winnerName);
                
            }
        }


        });
    }

    render(){
        return(
            <div>
                <Layout>
                <Header title=' ' id='header-bar' scroll style={{backgroundImage: 'url(https://www.whiteflowerfarm.com/mas_assets/cache/image/3/9/c/d/14797.Jpg)'}}>
                    <Button id="back" onClick={this.goToHome} style={{display:'block', color: 'white'}}>Home</Button>
                    <Button id="signout" onClick={this.signout} style={{display:'block', color: 'white'}}>Sign Out</Button>

                </Header>
                <h1 style={{fontFamily: 'Merriweather serif', textDecoration: 'underline'}}>Awards</h1>
                <h3 id='awards-indicator' style={{fontFamily: 'Merriweather serif'}}>No Awards Yet</h3>
                <div id='awards-div'>
                <div id='first-place-div' style={{marginBottom: '100px'}}>
                    <h2 style={{fontFamily: 'Merriweather serif'}}>First Place</h2>
                </div>
                <div id='second-place-div' style={{marginBottom: '100px'}}>
                    <h2 style={{fontFamily: 'Merriweather serif'}}>Second Place</h2>
                </div>
                <div id='third-place-div' style={{marginBottom: '100px'}}>
                    <h2 style={{fontFamily: 'Merriweather serif'}}>Third Place</h2>
                </div>
                </div>
                {/* <div id='footer-div-awards'>  
                    <p>Carson Kaylor Web Solutions</p>
                    <p>240-457-2278</p>
                    <p><a href="mailto:carsonkaylor@gmail.com">
                    carsonkaylor@gmail.com</a></p>
                    <p>carsonkaylor.netlify.com</p>       
                </div> */}
                </Layout>
            </div>
        )
    }
}

export default Awards
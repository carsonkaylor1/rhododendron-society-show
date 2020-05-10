import React from 'react';
import firebase, { auth, storage, database } from '../../firebase.js';
import { Layout, Header, Button } from 'react-mdl';

class SpecialAwards extends React.Component{
    constructor(props){
        super(props);

        this.goToHome = this.goToHome.bind(this);
    }

    componentDidMount(){
        this.queryDatabase();
    }

    signout(){
        auth.signOut();
        window.location.pathname = "/";
    }

    goToHome(){
        this.props.history.push('/landingpage');
    }

    queryDatabase(){
        database.ref('/' + 'class5' + '/4/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');

            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            document.getElementById('best-azalea').append(image);
            document.getElementById('best-azalea').append(plantName);
            document.getElementById('best-azalea').append(winnerName);
        })
        database.ref('/' + 'class2' + '/4/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');

            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            document.getElementById('best-rhododendron').append(image);
            document.getElementById('best-rhododendron').append(plantName);
            document.getElementById('best-rhododendron').append(winnerName);
        })
        database.ref('/' + 'class2' + '/4/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            document.getElementById('best-in-show').append(image);
            document.getElementById('best-in-show').append(plantName);
            document.getElementById('best-in-show').append(winnerName);
        })
        database.ref('/' + 'class5' + '/0/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            document.getElementById('best-azalea-photo').append(image);
            document.getElementById('best-azalea-photo').append(plantName);
            document.getElementById('best-azalea-photo').append(winnerName);
        })
        database.ref('/' + 'class2' + '/7/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            document.getElementById('best-rhododendron-photo').append(image);
            document.getElementById('best-rhododendron-photo').append(plantName);
            document.getElementById('best-rhododendron-photo').append(winnerName);
        })
        database.ref('/' + 'class9' + '/0/').once('value').then(function(snapshot){
            var currentObject = snapshot.val();
            var plantName = document.createElement('p');
            var winnerName = document.createElement('p');
            var image = document.createElement('img');
            image.style.maxWidth = '750px';
            image.style.maxHeight = '750px';
            plantName.innerHTML = ('Plant name: ' + currentObject.caption);
            winnerName.innerHTML = ('Submitted By: ' + currentObject.name);
            image.src = currentObject.url;
            document.getElementById('best-landscape-photo').append(image);
            document.getElementById('best-landscape-photo').append(plantName);
            document.getElementById('best-landscape-photo').append(winnerName);
        })
    }

    render(){
        return(
            <div className='special-awards-body'>
                <Layout>
                <Header title=' ' id='header-bar' scroll style={{backgroundImage: 'url(https://www.whiteflowerfarm.com/mas_assets/cache/image/3/9/c/d/14797.Jpg)'}}>
                    <Button id="back" onClick={this.goToHome} style={{display:'block', color: 'white'}}>Home</Button>
                    <Button id="signout" onClick={this.signout} style={{display:'block', color: 'white'}}>Sign Out</Button>

                </Header>
                <h1 style={{textDecoration:'underline'}}>Special Awards</h1>
                <div style={{marginTop:'50px'}} id='best-azalea'>
                    <h2>Best Azalea in Show</h2>
                </div>
                <div style={{marginTop:'50px'}} id='best-rhododendron'>
                    <h2>Best Rhododendron in Show</h2>
                </div>
                <div style={{marginTop:'50px'}} id='best-in-show'>
                    <h2>Best in Show</h2>
                </div>
                <div style={{marginTop:'50px'}} id='best-azalea-photo'>
                    <h2>Best Azalea Photograph</h2>
                </div>
                <div style={{marginTop:'50px'}} id='best-rhododendron-photo'>
                    <h2>Best Rhododendron Photograph</h2>
                </div>
                <div style={{marginTop:'50px'}} id='best-landscape-photo'>
                    <h2>Best Landscape Photograph</h2>
                </div>
                </Layout>
            </div>
        )
    }

}

export default SpecialAwards;
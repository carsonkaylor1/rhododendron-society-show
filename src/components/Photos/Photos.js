import React from 'react';
import firebase, { auth, storage } from '../../firebase.js';
import './Photos.css';
require('firebase/auth');

class Photos extends React.Component{
    constructor(props){
        super(props);

        this.state={
            url: [],
            category: ''
            
        }
    }

    getPhotos(){
        var that = this;
        // Create a reference under which you want to list
        var listRef = storage.ref().child(this.props.category);

        // Find all the prefixes and items.
        listRef.listAll().then(function(res) {


        res.prefixes.forEach(function(folderRef) {
        });


        res.items.forEach(function(itemRef) {
        // All the items under listRef.
        itemRef.getDownloadURL().then(imgUrl => {
            that.setState(state => {
                const url = state.url.concat(imgUrl);

                return {
                    url
                };
            });
            
        // document.getElementById("photo_div").append(`<img src="${that.state.url}"/>`)
            
        })
        
        });


        }).catch(function(error) {

        });
        
    }


    render(){
        return(
            <div id="photo-div">
                <h1>photos</h1>
                {
                    this.state.url.map(photoUrl => {
                        return <img className="photo-uploads" src={photoUrl} key={photoUrl}/>
                    })
                }
               
            </div>
        )
    }
}

export default Photos;
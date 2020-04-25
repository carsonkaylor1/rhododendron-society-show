import React from 'react';
import { Textfield, Button, Layout, Header, Navigation } from 'react-mdl';
import './HomePage.css'
import LoginPage from '../LoginPage/LoginPage';
import Photos from '../Photos/Photos';
import firebase, { auth, storage, database } from '../../firebase.js';
require('firebase/auth');

// Get Elements
var uploader;
var fileButton = document.getElementById("fileButton");
var percentage = 0;
var file;
var fileId;

const adminItems = document.querySelectorAll('.admin');

class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            percentage: 0,
            url: '',
            category: '',
            isEmptyPhotoState: true,
            numChildren: 0
        }
 
        this.getFile = this.getFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.viewPhotos = this.viewPhotos.bind(this);
        this.modifyAwardValue = this.modifyAwardValue.bind(this);          
    }

    componentDidMount(){
        uploader = document.getElementById("uploader");
        this.props.checkAuth();
        if(this.props.displayPhotos){           
        }
    }

    viewPhotos(){
        document.getElementById("view-photos").style.display='none';
        document.getElementById("full-upload-div").style.display='none';
        if(this.props.admin){
            document.getElementById("submit-award").style.display='block';  
        }
        this.props.viewPics();
    }


    getFile(e){
        // Get file
        file = e.target.files[0];
        fileId = `image${file.name}`
        document.getElementById('image-upload-text').innerHTML = fileId
    }

    uploadFile(){
        document.getElementById('plant-upload').innerHTML = '';
        if(document.getElementById("input-plant-name").value && document.getElementById("input-user-name").value && storage.ref(this.props.category + '/' + file))
        {

        
        
        try{
            var storageRef = storage.ref(this.props.category + '/' + file.name);
            // Upload file
            var task = storageRef.put(file);

            // Update progress bar
            task.on('state_changed',       
            function progress(snapshot){
            percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var roundedPercentage = Math.round(percentage * 10) / 10;
           
            // percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           // if(uploader.value!=null){
            //    uploader.value = percentage;
            //}
            document.getElementById('plant-upload-percentage').innerHTML = ('Upload progress: ' + roundedPercentage + '%');
        },

        function error(err){

        },

        function complete(){
            var awardsInDB = false;
            database.ref('/' + this.props.category + '/awards').once('value', function(snapshot){
                if(snapshot.numChildren() > 0){
                    awardsInDB = true;
                }
                else{
                    awardsInDB = false;
                }
            });
            

            database.ref('/' + this.props.category + '/').once('value', function(snapshot) {
                const numberOfChildren = (snapshot.numChildren());
                if(awardsInDB){
                    this.setState({
                        numChildren: (numberOfChildren-1)
                    })
                }
                else{
                    this.setState({
                        numChildren: (numberOfChildren)
                    })
                }
                
                
            }.bind(this))
            storage.ref(this.props.category).child(file.name).getDownloadURL().then(imgUrl => {

                
                var postKey = database.ref('/' + this.props.category + '/').push().key;

               
                var updates = {};
                var postData = {
                    url: imgUrl,
                    id: this.state.numChildren,
                    caption: document.getElementById("input-plant-name").value,
                    name: document.getElementById("input-user-name").value,
                    award: 'none'
                }
                updates['/' + this.props.category + '/' + postData.id] = postData;
                firebase.database.ref().update(updates);

                this.setState({url: imgUrl});
            })
        }.bind(this)
        );
    }
    catch{  
        var errorMessage = document.createElement('p')
        errorMessage.innerHTML = 'Not all information has been entered';
        document.getElementById('plant-upload').append(errorMessage);
    }
    }
    else{
        var errorMessage = document.createElement('p')
        errorMessage.innerHTML = 'Not all information has been entered';
        document.getElementById('plant-upload').append(errorMessage);
    }
    }

    

    modifyAwardValue(){
        var firstPlaceName;
        var secondPlaceName;
        var thirdPlaceName;
        var firstPlaceValue = document.getElementById("input-first-place").value
        var secondPlaceValue = document.getElementById("input-second-place").value
        var thirdPlaceValue = document.getElementById("input-third-place").value
        var numChildren;
        var category = this.props.category;
        if(firstPlaceValue && secondPlaceValue && thirdPlaceValue){
        var awardData = {
            first: document.getElementById("input-first-place").value,
            second: document.getElementById("input-second-place").value,
            third: document.getElementById("input-third-place").value
        }
        document.getElementById('submit-award-button').style.display = 'none';
        document.getElementById('award-success-message').innerHTML = 'Awards Submitted';

        database.ref('/' + this.props.category + '/').once('value', function(snapshot) {
            numChildren = snapshot.numChildren();
        })
        
        if(awardData.first >= 0){

        
        database.ref('/' + this.props.category + '/' + awardData.first).once('value').then(function(snapshot){
            firstPlaceName = snapshot.val();                    
            var postData ={
                id: awardData.first,
                author: firstPlaceName
            }
            var newPostKey = database.ref('/' + category + '/').push().key;
            var updates = {};
            updates['/' + category + '/awards/first/' + 'winner/'] = postData;
            database.ref().update(updates);

        });
    }
    if(awardData.second >= 0){
        database.ref('/' + this.props.category + '/' + awardData.second).once('value').then(function(snapshot){
            secondPlaceName = snapshot.val();
            var postData ={
                id: awardData.second,
                author: secondPlaceName
            }
            var newPostKey = database.ref('/' + category + '/').push().key;
            var updates = {};
            updates['/' + category + '/awards/second/' + 'winner/'] = postData;
            database.ref().update(updates);
        });
    }
        if(awardData.third >= 0){
        database.ref('/' + this.props.category + '/' + awardData.third).once('value').then(function(snapshot){
            thirdPlaceName = snapshot.val();
            var postData ={
                id: awardData.third,
                author: thirdPlaceName
            }
            var newPostKey = database.ref('/' + category + '/').push().key;
            var updates = {};
            updates['/' + category + '/awards/third/' + 'winner/'] = postData;
            database.ref().update(updates);
        });
    }
}
else{
    document.getElementById('award-error-message').innerHTML = 'Must Enter ID for all awards';
}
    }
    

    render(){
        return(
            <div className="container">
                {this.setup}
                <Layout>
               
                <h1 style={{fontFamily: 'Merriweather serif'}}>{this.props.categoryName} Entries</h1>
                <div id='full-upload-div'>
                <div>
                    <h4 style={{fontFamily: 'Merriweather serif'}}>Please only submit one photo of each plant.</h4>
                </div>
                <div id='post-instructions'>
                    <ol style={{textAlign: 'left'}}>
                        <li>Click 'Upload File' to upload photo of plant</li>
                        <li>Enter the name of your plant</li>
                        <li>Enter your name (this will not be displayed)</li>
                        <li>Once you have entered the above information, click 'SUBMIT'</li>
                    </ol>
                </div>
                <div id='upload-section'>
                <div className='upload-div'>
                {/* <progress id="uploader" value="0" max="100" >0%</progress> */}
                <label className="upload-group" style={{color:'blue', textDecoration:'underline'}}>
                    Upload File
                    {/* <input id="fileButton" className="upload-group" type="file" value="" onChange={this.getFile}></input> */}
                    <input id="fileButton" className="upload-group" type="file" value="" onChange={this.getFile}></input>
                </label>
                </div>
                <div>
                    <p id='image-upload-text'></p>
                </div>
                <div className='upload-div'>
                <input id="input-plant-name" type="text" placeholder="Enter Name of Plant" style={{width: '500px'}}></input>
                <input id="input-user-name" type="text" placeholder="Enter Your Name" style={{width: '500px', marginLeft: '5%'}}></input>
                </div>
                <div id='plant-upload-percentage'></div>
                <div id='plant-upload' ></div>
                <div className='upload-div'>
                <Button id="uploadButton" onClick={this.uploadFile} raised primary colored style={{display:'block', width:'150px'}}>SUBMIT</Button>
                </div>
                <div id="button-container">
                    <Button id="view-photos" onClick={this.viewPhotos} raised accent colored style={{display:'block'}}>View Photos</Button>
                </div>
                </div>
                <br/>
                <div id='uploaded-image-div'  style={{marginBottom: '25px'}}>
                <img id='uploaded-image' src={this.state.url}/>
                </div>
                </div>
                <div id='photo-div' style={{display:'block'}}>
                {/* {this.state.isEmptyPhotoState && <Photos category='none'/>} */}
                {this.state.isPhotoState && <Photos category={this.props.category}/>}
                </div>
                <div id="photo-caption-div">
                    
                </div>
                <div id='submit-award' className='admin'>
                    <h3 style={{fontFamily: 'Merriweather serif'}}>Select ID of winners</h3>
                    <p>Please do not submit awards until after entry period is over.</p>
                    <input id="input-first-place" type="text" placeholder="Enter First Place Winner ID" style={{width: '250px', marginTop:'25px'}}></input>
                    <input id="input-second-place" type="text" placeholder="Enter Second Place Winner ID" style={{width: '250px', marginLeft: '5%', marginTop:'25px'}}></input>
                    <input id="input-third-place" type="text" placeholder="Enter Third Place Winner ID" style={{width: '250px', marginLeft: '5%', marginTop:'25px'}}></input>
                    <div style={{marginTop: '25px'}}>
                        <Button id="submit-award-button" raised primary colored style={{width:'150px'}} onClick={this.modifyAwardValue}>SUBMIT AWARDS</Button>
                    </div>
                    <div >
                        <p id='award-success-message'></p>
                    </div>
                    <div>
                        <p id='award-error-message'></p>
                    </div>
                </div>
                {/* <div id='footer-div-home'>  
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

export default HomePage;
import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Textfield, Button, Layout, Header, Navigation, Cell, Grid, Card, CardActions, CardTitle, CardText } from 'react-mdl';
import './LandingPage.css';
import HomePage from '../HomePage/HomePage';
import firebase, { auth, storage, database, functions } from '../../firebase.js';


const adminItems = document.querySelectorAll('.admin');



class LandingPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            category: '',
            categoryName: '',
            displayPhotos: true,
            isEmptyPhotoState: true,
            isPhotoState: false,
            admin: false
        }

        this.queryDatabase = this.queryDatabase.bind(this);
        this.viewPhotos = this.viewPhotos.bind(this);
        this.setup = this.setup.bind(this);
    }

    setup(user){
        console.log('setting up ui');
        if(user){
            if(user.admin){
                adminItems.forEach(item => item.style.display = 'block')
            }
        }
    }

    checkAuth(){
        console.log('checking auth');
        auth.onAuthStateChanged(function(user){
            if(user){
                user.getIdTokenResult().then(idTokenResult => {
                    user.admin = idTokenResult.claims.admin;
                    console.log(user.admin);
                    if(user.admin){
                        const adminItems = document.querySelectorAll('.admin');
                        adminItems.forEach(item => item.style.display = 'block');
                    }
                    else{
                        const adminItems = document.querySelectorAll('.admin');
                        adminItems.forEach(item => item.style.display = 'none');
                    }
                })
                
            }
            else{
                console.log('user is not signed in');
                window.location.pathname = "/";
            }
            
            
        })
    }

    componentDidMount(){
        this.checkAuth();

        const adminForm = document.querySelector('.admin-actions');
        adminForm.addEventListener('submit', (e) => {
        e.preventDefault(); //prevent default reloading of page
        const adminEmail = document.querySelector('#admin-email').value;
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({email: adminEmail}).then(result => {  // {email: adminEmail} represents 'data' object in addAdminRole function
        }) 
        document.getElementById('admin-success').innerHTML = (adminEmail + ' is now an admin');
    })
       
    }

    
    loadCategoryPage(category, categoryName, displayPhotos){
        console.log(category)
        this.setState({
            category: category,
            categoryName: categoryName,
            displayPhotos: displayPhotos
        })
        document.getElementById("category-page").style.display='none';
        document.getElementById("homepage-div").style.display='block';
        // document.getElementById("footer-div").style.display='none';
        document.getElementById("admin-form").style.display='none'
        if(displayPhotos){
            document.getElementById("full-upload-div").style.display='none';
            this.queryDatabase(category);
        }
        else{
            document.getElementById("submit-award").style.display='none';
        }
     
        
    }

    queryDatabase(category){
        console.log("query database");
        console.log(category);
        database.ref('/' + category + '/').once('value').then(function(snapshot){
            var postArray = snapshot.val();
            if(postArray){
                console.log(postArray);
                var keys = Object.keys(postArray);
                for (var i=0; i<keys.length; i++){
                    var currentObject = postArray[keys[i]];

                    var image = document.createElement("img");
                    var id = document.createElement("p");
                    var p = document.createElement("p");
                    var div = document.createElement("div");
                    image.src = currentObject.url;
                    image.style.width = '750px';
                    image.style.maxHeight = '1500px';
                    id.innerHTML = ('ID: ' + currentObject.id);
                    p.innerHTML = ('Plant name: ' + currentObject.caption);
                    p.style.fontSize = '22px';
                    p.style.marginTop = '25px';
                    div.style.marginTop = '25px';
                    div.style.marginBottom = '25px';
                    div.append(image);
                    div.append(p);
                    div.append(id);
                   
                    if(currentObject.id >= 0){
                        document.getElementById("photo-caption-div").append(div);
                        // document.getElementById("photo-caption-div").append(id);
                        // document.getElementById("photo-caption-div").append(p);
                    }
                    

            }
            }
            else{
                var noImgTxt = document.createElement('h3')
                noImgTxt.innerHTML = "No photos uploaded";
                document.getElementById("photo-caption-div").append(noImgTxt);
            }
            
        })
    }


    viewPhotos(){
        this.queryDatabase(this.state.category);
        this.setState({
            isEmptyPhotoState: false,
            isPhotoState: true
        })
        console.log("state category: " + this.state.category)
        document.getElementById('photo-div').style.display = 'block';

    }

    signout(){
        console.log("sign out");
        auth.signOut();
        window.location.pathname = "/";
    }

    back(){
        window.location.pathname = "/landingpage";
    }

    render(){
        return(
            <div>
                
                <Layout >
                <Header title=' ' id='header-bar' scroll style={{backgroundImage: 'url(https://www.whiteflowerfarm.com/mas_assets/cache/image/3/9/c/d/14797.Jpg)'}}>
                    <Button id="back" onClick={this.back} style={{display:'block', color: 'white'}}>Back</Button>
                    <Button id="signout" onClick={this.signout} style={{display:'block', color: 'white'}}>Sign Out</Button>

                </Header>
                <div id='admin-form' class='admin'>
                <form class='admin-actions admin' style={{marginTop: '50px', display:'none'}}>
                    <input type='email' placeholder='User email' id='admin-email' required/>
                    <button>Make admin</button>
                </form>
                <div class='admin' style={{marginTop: '25px'}}>
                    <p id='admin-success'></p>
                </div>
                </div>
                <div id='category-page'>
                <Grid>
                    <Cell col={12}>
                        <div className="category-header">
                            <h1 style={{fontFamily: 'Merriweather serif'}}>Choose Entry Category</h1>
                        </div>
                    </Cell>
                </Grid>
                    <div id="categories-grid" style={{marginBottom:'50px'}}>

                        {/* Class 1.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://www.almanac.com/sites/default/files/image_nodes/rhododendron-pink-bush-edit.jpg) center / cover', marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Rhododendron Species</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class1', 'Rhododendron Species', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class1', 'Rhododendron Species', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                               
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class1'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                    </Button>
                                    
                                
                            </CardActions>
                        </Card> 

                        {/* Class 2.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://macars.org/PlantSaleData/Delp/BodyLanguage-01-800.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Rhododendron Hybrids Elepidote</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class2', 'Rhododendron Hybrids Elepidote', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class2', 'Rhododendron Hybrids Elepidote', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class2'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 3.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://photos1.blogger.com/x/blogger/5661/836/640/17762/Faisa.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Rhododendron Hybrids-Lepidote</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class3', 'Rhododendron Hybrids-Lepidote', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class3', 'Rhododendron Hybrids-Lepidote', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class3'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 4.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://i1.wp.com/www.gardeningknowhow.com/wp-content/uploads/2007/07/azalea-bush.jpg?fit=1024%2C681&ssl=1) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Azalea Species</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class4', 'Azalea Species', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class4', 'Azalea Species', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class4'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 5.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://www.flowerpictures.net/Flowerpictures/individual_flowers/azalea/images/azalea_ginger.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Azalea Hybrids-Deciduous</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class5', 'Azalea Hybrids-Deciduous', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class5', 'Azalea Hybrids-Deciduous', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class5'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 6.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://macars.org/PlantSaleData/McDonald/AngelWings-02-800.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Azalea Hybrids-Evergreens</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class6', 'Azalea Hybrids-Evergreens', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class6', 'Azalea Hybrids-Evergreens', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class6'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 7.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://i.pinimg.com/originals/85/e5/75/85e575b3809ec23a35a93a274822bb6c.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>New Azalea and Rhododendron Hybrids</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class7', 'New Azalea and Rhododendron Hybrids', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class7', 'New Azalea and Rhododendron Hybrids', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class7'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 8.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://i.pinimg.com/originals/2d/d0/ed/2dd0ed3c967a08e210435b693fda66d1.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>ARS. Seed Exchange</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class8', 'ARS. Seed Exchange', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class8', 'ARS. Seed Exchange', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class8'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 9.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://midwestars.org/wp-content/uploads/2017/03/home-3-1024x576.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Specimen Plants</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class9', 'Specimen Plants', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class9', 'Specimen Plants', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class9'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 10.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://www.almanac.com/sites/default/files/image_nodes/rhododendron-2377022_1920.jpg) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Novice Entries</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class10', 'Novice Entries', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class10', 'Novice Entries', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class10'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>

                        {/* Class 11.0 */}
                        <Card shadow={0} style={{width: '500px', height: '256px', background: 'url(https://ask.extension.org/uploads/question/images/attachments/000/140/000/rhodoleaves_original.JPG?1472585233) center / cover',  marginTop: '50px'}}>
                            <CardTitle expand />
                            <CardText>
                            <h1 style={{fontSize:'24px', fontFamily:'Quicksand', marginBottom:'.5em', marginTop:'0', color: 'white'}}>Foilage</h1>
                            </CardText>
                            <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                                <a onClick={() => this.loadCategoryPage('class11', 'Foilage', false)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>Submit Photos</Button>
                                </a>
                                <a onClick={() => this.loadCategoryPage('class11', 'Foilage', true)}>
                                    <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>View Photos</Button>
                                </a>
                                <Button colored style={{fontFamily:'Quicksand', width:'33%', color: 'white'}}>
                                        <Link to={{pathname: '/awards', state:{category: 'class11'}}} style={{color: 'white', textDecoration: 'none', fontFamily:'Quicksand'}}>Awards</Link>
                                </Button>
                            </CardActions>
                        </Card>
                 
                    </div>
                    </div>
                    <div id="homepage-div" style={{display: 'none'}}>
                    <HomePage category={this.state.category} categoryName={this.state.categoryName} displayPhotos={this.state.displayPhotos} queryDB={this.queryDatabase} viewPics={this.viewPhotos} setup={this.setup} admin={this.state.admin} checkAuth={this.checkAuth}/>
                    </div>
                    {/* <div id='footer-div'>  
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

export default LandingPage;

import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import FaceRecongition from './Components/FaceRecongition/FaceRecongition';
import Particles from 'react-particles-js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';

const part = {
  particles: {
    number:{
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }   
  }
}


const initialState = {
      input: ' ',
      imageurl:' ',
      box:[],
      route: 'signin',
      isSignedin: false,
      user: {
         id: '',
         name: '',
         email: '',
         entries: 0,
         date: ''
      }
  }

class App extends Component {
  
 constructor(){
    super();
    this.state = initialState;
    }

  loadUser = (data) => {
    this.setState({user:
      {  id: data.id,
         name: data.name,
         email: data.email,
         entries: data.entries,
         date: data.date
    }})
  }

 calculateFaceLocation = (data) => {
    const region = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = []; 
    
   region.forEach(reg => {
         clarifaiFace.push({
            leftCol: reg.region_info.bounding_box.left_col * width,
            topRow: reg.region_info.bounding_box.top_row * height,
            rightCol: width - (reg.region_info.bounding_box.right_col * width),
            bottomRow: height - (reg.region_info.bounding_box.bottom_row * height)
            });
         });
     return clarifaiFace; 
}
 
 displayFaceBox = (box) => {
   this.setState({box: box});
 }

  onInputChange = (event) => {
      this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageurl: this.state.input});
    
    fetch('https://obscure-coast-69030.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
              })
          })
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch('https://obscure-coast-69030.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
         }
       this.displayFaceBox(this.calculateFaceLocation(response))
       })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    let flag = true;
    if(route === 'home')
      this.setState({isSignedin: true});
    else if(route === 'signout'){
       this.setState(initialState);
       flag = false;
     }
    if(flag)
     this.setState({route: route});
  }

  render(){
    const { isSignedin, route, box, imageurl } = this.state;
    return(
         <div className="App">
         <Particles className="particles"
              params={part}
            />
         <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin }/>
         { route === 'home'
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                 onInputChange={this.onInputChange} 
                 onButtonSubmit={this.onButtonSubmit}
                  />
                <FaceRecongition box={box} imageurl={imageurl}/> 
              </div> 
              : ( route === 'signin'
                ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                )
            }
         </div>
    );
  }
}

export default App;

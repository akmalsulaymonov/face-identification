import React, { Component } from 'react';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: '01a3395be0d94471a174411513d505ed'
 });

const particlesOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 3,
        opacity: 0.8,
        size: 80,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: true,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: 300,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  /*
  componentDidMount(){
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(console.log)
  }
  */

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () =>{
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => {
          //console.log('hi', response)
          if(response){
              fetch('http://localhost:3001/image', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then( data => {
                this.setState({
                  user: {
                    entries: data.count
                  }
                });
                this.loadUser(data);
              });
          }

          this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch( err => console.log(err) );
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){

    const { isSignedIn, imageUrl, route, box } = this.state;

    const particlesInit = (main) => {
      //console.log(main);
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };
    
    const particlesLoaded = (container) => {
      //console.log(container);
    };

    return (
      <div className="App">
  
          <Particles
            id="tsparticles" 
            className="particles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
          />  
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { route === 'home' ? 
            <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div> 
            : (
                route === 'register' 
                ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          }
      </div>
    );
  }
  
}

export default App;
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation';
import FaceRecognition from './components/FaceRecognition';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import './App.css';

let app = new Clarifai.App({apiKey: '51fb1f6d3ad84b99851380f18d4113a7'});

const particlesOptions = {
      particles: {
        line_linked: {
          shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5,
            value_area: 800
          }
        }
      }
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", 
    this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  };
 
  render() {
    return (
      <div className="App">
      <Particles className='particles'
       params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import './App.css';

let app = new Clarifai.App({ apiKey: '51fb1f6d3ad84b99851380f18d4113a7' });

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width - (clarifaiFace.right_col * width),
      bottom: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b",
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  };
  //his.displayFaceBox(this.calculateFaceLocation(response)))
  //.catch(err => console.log(err));
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        { this.state.route === 'signin'
          ? <Signin />
          : <div> 
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        }
      </div>
    );
  }
}

export default App;

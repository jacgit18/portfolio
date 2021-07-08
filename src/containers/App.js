import React, { Component } from "react";
// import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from "../Components/Navigation/Navigation";
import Logo from "../Components/Logo/Logo";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";
import Rank from "../Components/Rank/Rank";

import Banner from "../Components/Banner";
// import Body from "../Components/Body";

import Footer from "../Components/Footer";

import '../style/App.css';
// import Scroll from "../Components/Scroll";
// import ErrorBoundary from "../Components/ErrorBoundary";

const app = new Clarifai.App({
 apiKey: 'd39499b3505a4a00b787eb91e10ce51f'
});

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }
class App extends Component {
  constructor() {
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

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((response) => response.json())
  //   .then((users)=>{
  //       this.setState({robots:users})

  //   })

  // }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    // this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    // this.setState({imageUrl: this.state.input});
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b","https://samples.clarifai.com/face-det.jpg")
    .then(
      function (response) {
      console.log(response)
    }, 
    function (err) {

    }
    )

  }


//   onButtonSubmit = () => {
//     this.setState({imageUrl: this.state.input});
//     app.models
//     .predict(
//       // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
//       // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
//       // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
//       // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
//       // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
//       // so you would change from:
//       // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
//       // to:
//       // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
//       Clarifai.FACE_DETECT_MODEL,
//       this.state.input)
//     .then(response => {
//       console.log('hi', response)
//       if (response) {
//         fetch('http://localhost:3000/image', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             id: this.state.user.id
//           })
//         })
//           .then(response => response.json())
//           .then(count => {
//             this.setState(Object.assign(this.state.user, { entries: count}))
//           })

//       }
//       this.displayFaceBox(this.calculateFaceLocation(response))
//     })
//     .catch(err => console.log(err));
// }

  render() {
    // const { robots, searchfield } = this.state;
    // const filteredRobots = robots.filter( (robot) => {
    //     return robot.name.toLowerCase().includes(searchfield.toLowerCase())

    // }
    // )

    // if(!robots.length) {
    //     return <h1> Loading</h1>
    // } else{

   
    // );

    return (
      <div className="App ">
       {/* <Particles className='particles'
          params={particlesOptions}
        /> */}
        <Banner />

      

        
        {/* <Scroll> */}
        {/* <ErrorBoundary>
        </ErrorBoundary> */}

        <Navigation />
        <Logo />
        <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
                            <FaceRecognition  />

              {/* <FaceRecognition box={box} imageUrl={imageUrl} /> */}


        {/* <Body /> */}
        {/* </Scroll> */}

        <Footer />

      </div>

    )}


  // }
}

export default App;

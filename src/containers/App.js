import React, { Component } from "react";
// import Particles from "react-tsparticles";


import Register from '../Components/Register/Register';
import Signin from '../Components/Signin/Signin';

import Navigation from "../Components/Navigation/Navigation";
import Logo from "../Components/Logo/Logo";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";
import Rank from "../Components/Rank/Rank";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import '../style/App.css';



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
const initialState = {
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

// const particlesInit = (main) => {
//   console.log(main);

//   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
// };

// const particlesLoaded = (container) => {
//   console.log(container);
// };
class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   input: '',
    //   imageUrl: '',
    //   box: {},
    //   route: 'signin',
    //   isSignedIn: false,
    //   user: {
    //     id: '',
    //     name: '',
    //     email: '',
    //     entries: 0,
    //     joined: ''
    //   }
    // }

    this.state = initialState;

  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/').then(response => response.json()).then(console.log)
  // }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


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
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }



//   onButtonSubmit = () => {
//     this.setState({imageUrl: this.state.input});
//     fetch('http://localhost:3000/imageurl', {
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         input: this.state.input
//       })
//     }).then(response => response.json())

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
// onRouteChange = (route) => {
//   if (route === 'signout') {
//     this.setState({initialState})
//   } else if (route === 'home') {
//     this.setState({isSignedIn: true})
//   }
//   this.setState({route: route});
// }



  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
      <div className="App ">
       {/* <Particles className='particles'
          params={particlesOptions}
        /> */}

        

        {/* <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
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
              duration: 2,
              opacity: 0.8,
              size: 40,
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
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    /> */}

        <Banner />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <div>
              <Logo />
              
             
              
            </div>
      
        
        <Footer />

      </div>
      

    )}


}

export default App;

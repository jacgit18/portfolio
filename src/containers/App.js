import React, { Component } from "react";
import Navigation from "../Components/Navigation/Navigation";
import Logo from "../Components/Logo/Logo";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";

import Banner from "../Components/Banner";
import Body from "../Components/Body";

import Footer from "../Components/Footer";

import '../style/App.css';
// import Scroll from "../Components/Scroll";
// import ErrorBoundary from "../Components/ErrorBoundary";


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users)=>{
        this.setState({robots:users})

    })

  }

  onSearchChange = (event) => {
      this.setState({searchfield: event.target.value}); 
       
  }
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
      <div className="tc ">
        <Banner />

      

        
        {/* <Scroll> */}
        {/* <ErrorBoundary>
        </ErrorBoundary> */}

        <Navigation />
        <Logo />

        <ImageLinkForm />
        <FaceRecognition />


        <Body />
        {/* </Scroll> */}

        <Footer />

      </div>

    )}


  // }
}

export default App;

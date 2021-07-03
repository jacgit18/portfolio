import React, { Component } from "react";
import CardList from "../Components/CardList";
// import { robots } from "./Components/robots"; // must destructure since not exporting default 
import SearchBox from "../Components/SearchBox";
import '../style/App.css';
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";


// state -> props a state is a object that can change and affect the app use class when dealing with state
// App Component -> (robotState/searchfieldState)  -> states get rendered and passed down as props to other components
// any component that has state uses app component so they have access to the constructor and the defiened states
// App Component is considered a smart component
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
    // console.log("constructor")
  }

  componentDidMount() {
      // fetch is apart of window object in browser
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users)=>{
        this.setState({robots:users})
        // cam be multi line to

    })

  }

  // created method not built in like constructor so must be functional method
  onSearchChange = (event) => {
      this.setState({searchfield: event.target.value}); // update searchfield value
       
  }
// we render multiple times if we update state
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter( (robot) => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    // console.log("render")
    // if robots app state array is empty load or return other components of render 
    if(!robots.length) {
        return <h1> Loading</h1>
    } else{

    return (
      <div className="tc ">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange = {this.onSearchChange} />
        <Scroll>
        <ErrorBoundary>
        <CardList robots={filteredRobots} />
        </ErrorBoundary>
        </Scroll>
      </div>
    );
    }

    // ternary versiom
  //   return !robots.length ? <h1> Loading</h1> :
  // (
  //   <div className="tc ">
  //     <h1 className="f1">RoboFriends</h1>
  //     <SearchBox searchChange = {this.onSearchChange} />
  //     <Scroll>
  //     <CardList robots={filteredRobots} />
  //     </Scroll>
  //   </div>
  // );
  }
}

export default App;

import React, { Component } from "react";

class Hello extends Component {
  render() {
    return (
      <div className="f1 tc ">
       <h1>Hello</h1>

       <p> {this.props.welcome} </p>


      </div>
    );
  }
}

export default Hello;

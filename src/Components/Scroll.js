import React from 'react';

// using props to access childeren

const Scroll = (props) => {

    return (
        <div style={{overflow: 'scroll', border: '5px solid black', height: '500px'}}>

        {props.children}
        </div>
        
        );


}


export default Scroll;
import React from "react";
import Card from "./Card";

// pure functions and props are just inputs that dont get modified

const CardList = ({ robots }) => {
  // good for production`
  // if(true){
  //   throw new Error("Nooo")
  // }
  return (
    <div>
      {robots.map((user, index) => {
        return (
          <Card
            key={index}
            id={robots[index].id}
            name={robots[index].name}
            email={robots[index].email}
          />
        );
      })}
    </div>
  );
};

export default CardList;

import React from "react";
import Messege from "./Messege";

const Messeges = (props) => {
  return (
    <>
      {props.messeges.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </>
  );
};

export default Messeges;

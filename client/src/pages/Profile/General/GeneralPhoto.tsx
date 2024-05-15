import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: auto;
  height: 400px;     

`;


const GeneralPhoto = () => {


  const handleError = (e: any) => {
    e.target.src = "http://localhost:3000/images/NoAvatar.jpg"; // Запасной URL
  };

  return (
    <Img src="http://localhost:8081/auth/photo/1" onError={handleError} />
  );
};

export default GeneralPhoto;
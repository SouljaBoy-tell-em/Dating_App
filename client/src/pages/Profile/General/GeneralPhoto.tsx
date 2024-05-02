import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 400px;
  height: auto;     

`;


const GeneralPhoto = () => {
  const handleError = (e: any) => {
    e.target.src = "http://localhost:3000/images/NoAvatar.jpg"; // Запасной URL
  };

  return (
    <Img src="http://25.47.247.34:8081/auth/photo/1" onError={handleError} />
  );
};

export default GeneralPhoto;

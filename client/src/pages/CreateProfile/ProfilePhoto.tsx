import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 400px;     
  box-shadow: 0 0 2px 2px #cfa9f2;
`;

const ProfilePhoto = () => {
  const handleError = (e:any) => {
    e.target.src = "http://localhost:3000/images/NoAvatar.jpg"; 
  };

  return <Img src="http://25.47.247.34:8081/auth/photo/1" onError={handleError} />;
};

export default ProfilePhoto;

import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: auto;
  height: 400px;
  box-shadow: 0 0 2px 2px gray;
  @media (max-width:1224px) {
    width: 100%;
    height: auto;
    max-width: 600px;
  }
`;

interface UserImageInterface {
  src:string
}

const UserImage:React.FC<UserImageInterface> = ({src}) => {
  const handleError = (e: any) => {
    e.target.src = "/images/NoAvatar.jpg"; // Запасной URL
  };

  return (
    <Img
      src={src}
      onError={handleError}
    />
  );
};

export default UserImage;
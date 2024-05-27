import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: auto;
  height: 400px;
  box-shadow: 0 0 2px 2px gray;
`;

interface UserImageInterface {
  src:string
}

const UserImage:React.FC<UserImageInterface> = ({src}) => {
  const handleError = (e: any) => {
    e.target.src = "http://localhost:3000/images/NoAvatar.jpg"; // Запасной URL
  };

  return (
    <Img
      src={src}
      onError={handleError}
    />
  );
};

export default UserImage;
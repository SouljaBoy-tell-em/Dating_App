import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { $avatar_url } from "../../../shared/services/ProfileService";
import { observer } from "mobx-react-lite";
import Context from "../../..";
import { API_URL } from "../../../shared/http";
import ChatService from "../../../shared/services/ChatService";
const Img = styled.img`
  width: auto;
  height: 400px;
`;

const GeneralPhoto = observer(() => {
  const { store } = useContext(Context);

  useEffect( () => {
    store.getAvatarURL();
    console.log(store.avatarURL);
  }, []);


  return (
    <Img
      src={ChatService.getImageUrl(store.avatarURL) || "http://localhost:3000/images/NoAvatar.jpg"}
    />
  );
});

export default GeneralPhoto;

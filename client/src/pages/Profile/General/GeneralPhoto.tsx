import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { $avatar_url } from "../../../shared/services/ProfileService";
import Context from "../../..";
import { API_URL, getImageURL } from "../../../shared/http";
import ChatService from "../../../shared/services/ChatService";
const Img = styled.img`
  width: auto;
  height: 400px;
`;

const GeneralPhoto = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getAvatarURL();
    console.log(store.avatarURL);
  }, []);

  return (
    <Img
      src={
        store.avatarURL !== "http://localhost:8081/photo/null"
          ? getImageURL(store.avatarURL)
          : "/images/NoAvatar.jpg"
      }
    />
  );
});

export default GeneralPhoto;

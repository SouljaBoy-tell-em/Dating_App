import React, { useContext } from "react";
import styled from "styled-components";

import Header from "../Main1/Header";

import ProfileForm from "./ProfileForm";
import ProfilePhoto from "./ProfilePhoto";
import { observer } from "mobx-react-lite";
import Context from "../..";
import { AccessLevels } from "../../shared/accessLevel/accessLevel";
import { Navigate } from "react-router";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;

  background-color: #ffffff;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  height: min-content;
  background-color: #ffffff;
  position: absolute;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  top:300px;
`;

const CreateProfile = observer(() => {

  const {store} = useContext(Context);

  return ( store.accessLevel === AccessLevels.LEVEL2 ?
    <Container>
      <Header color="#f1e2ff" />
      <Wrapper>
        <ProfileForm/>
        <ProfilePhoto/>
      </Wrapper>
    </Container> : <Navigate to="/swiper"/>
  );
});

export default CreateProfile;

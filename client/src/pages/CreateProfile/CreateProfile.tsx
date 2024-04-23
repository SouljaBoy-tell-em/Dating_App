import React from "react";
import styled from "styled-components";
import Header from "../Main1/Header";
import ProfileForm from "./ProfileForm";

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

const CreateProfile = () => {
  return (
    <Container>
      <Header color="#D9D9D9" />
      <ProfileForm/>
    </Container>
  );
};

export default CreateProfile;

import React from "react";
import styled from "styled-components";
import ProfileForm from "../ProfileForm";
import Header from "../../Main/Header";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  margin-top: 100px;
`;
const MobileCreateProfile = () => {
  return (
    <Container>
      <Header />
      <ProfileContainer>
        <ProfileForm />
      </ProfileContainer>
    </Container>
  );
};

export default MobileCreateProfile;

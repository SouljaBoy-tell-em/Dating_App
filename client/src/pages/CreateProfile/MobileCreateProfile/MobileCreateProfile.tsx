import React from "react";
import styled from "styled-components";
import ProfileForm from "../ProfileForm";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const MobileCreateProfile = () => {
  return (
    <Container>
      <ProfileForm />
    </Container>
  );
};

export default MobileCreateProfile;

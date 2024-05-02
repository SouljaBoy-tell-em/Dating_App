import React from "react";

import styled from "styled-components";

import ProfileForm from "../../CreateProfile/ProfileForm";
import ProfilePhoto from "../../CreateProfile/ProfilePhoto";

import GeneralForm from "./GeneralForm";
import GeneralPhoto from "./GeneralPhoto";

const Container = styled.div`
  width: calc(100% - 350px);
  display: flex;
  justify-content: left;
  height: 600px;
`;

const Wrapper = styled.div`
  width: min-content;
  display: flex;
  align-items: top;
  gap: 50px;
  margin-left: 80px;
`;

const PhotoWrapper = styled.div`
    height: min-content;
    margin-top: 20px;
`;
const General = () => {
  return (
    <Container>
      <Wrapper>
        <GeneralForm />
        <PhotoWrapper>
          <GeneralPhoto />
        </PhotoWrapper>
      </Wrapper>
    </Container>
  );
};

export default General;

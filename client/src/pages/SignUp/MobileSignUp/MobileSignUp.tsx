import React from "react";
import styled from "styled-components";

import FormBlock from "../FormBlock";
import Header from "../../Main/Header";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top:100px;
`;

const MobileSignUp = () => {
  return (
    <Container>
      <Header/>
      <FormBlock />
    </Container>
  );
};

export default MobileSignUp;

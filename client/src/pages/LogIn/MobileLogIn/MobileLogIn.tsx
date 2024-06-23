import React from "react";
import styled from "styled-components";
import FormBlock from "../FormBlock";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileLogIn = () => {
  return (
    <Container>
      <FormBlock />
    </Container>
  );
};

export default MobileLogIn;

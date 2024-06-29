import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  font-size: xx-large;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <p>NOT FOUND 404</p>
    </Container>
  );
};

export default NotFoundPage;

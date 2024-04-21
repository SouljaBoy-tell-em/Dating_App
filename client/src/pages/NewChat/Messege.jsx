import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 15px;
  padding: 10px;
  background-color: #ffffff;
  width: fit-content;
`;

const Messege = () => {
  return (
    <Container>
      <p>Hello, world</p>
    </Container>
  );
};

export default Messege;

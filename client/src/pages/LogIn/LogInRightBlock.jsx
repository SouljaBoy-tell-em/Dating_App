import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 200px;
  position: relative;
  margin-right: 100px;
`;

const OutBlock = styled.div``;
const InnerBlock = styled.div``;
const Img = styled.img`
    margin-top: -80px;
`;

const LogInRightBlock = () => {
  return (
    <Container>
      <Img src="/images/logIn_right_human.svg"></Img> 
    </Container>
  );  
};

export default LogInRightBlock;

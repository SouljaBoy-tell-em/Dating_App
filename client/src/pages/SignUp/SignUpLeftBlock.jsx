import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-right: -10px;
  margin-top: -20px;
  margin-left: 70px;
  height: 100%;
  width: 200px;
  position: relative;
`;

const OutBlock = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  height: 390px;
  width: 290px;
  border-top-right-radius: 15px;
  background-color: #e4e4e4;
  position: absolute;
  bottom: 0;
  z-index: 2;
`;
const InnerBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const Img = styled.img`
  position: absolute;
  z-index: 10;
`;

const SignUpLeftBlock = () => {
  return (
    <Container>
      <Img src="/images/logIn_left_human.svg"></Img>
    </Container>
  );
};

export default SignUpLeftBlock;

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 290px;
  width: 700px;
  background-color: #ffffff;
  position: relative;
  color: black;
`;

const OutBlock = styled.div`
  height: 280px;
  width: 236px;
  background-color: ${(props) => props.backgroundcolor ? props.backgroundcolor : "#f1e2ff"};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0 10px 10px 10px;
  position: absolute;
`;
const InnerBlock = styled.div`
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 80px;
  top: 93px;
`;

const TitleText = styled.p`
  font-size: 80px;
  font-weight: 600;
`;

const TitleUnderline = styled.div`
  background-color: ${(props) => props.backgroundcolor ? props.backgroundcolor : "#f1e2ff"};
  width: 100%;
  height: 30px;
`;

const Heart = styled.img`
  width: 165px; 
  height:165px;
  z-index: 100;
  position:absolute;
  left:440px;
  top:80px;
`;
const Logo = (props) => {
  return (
    <Container>
      <OutBlock backgroundcolor={props.color}>
        <InnerBlock />
      </OutBlock>
      <TitleBlock >
        <TitleText>Phystech.Date</TitleText>
        <TitleUnderline backgroundcolor={props.color}/>
      </TitleBlock>
      <Heart src="images/header/Heart.svg"/>
    </Container>
  );
};

export default Logo;

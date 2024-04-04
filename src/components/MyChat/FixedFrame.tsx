import React from "react";
import styled from "styled-components";

const dt = 100; //расстояние от верха страницы в пикселях

const Container = styled.div`

`;

const Window = styled.div`
  background-color: #ff8b8b;
  height: 500px;
  width: 500px;
  border-radius: 10px;
`;

const Header = styled.div`
  background-color: orange;
  height: 10vh;
  width: 100%;
  z-index: 200;
`;

const Footer = styled.div`
  
  background-color: orange;
  height: calc(80vh - 500px);
  width: 100%;
  z-index: 200;
`;

const FixedFrame = () => {
  return (
    <Container>
      {/* <Header />
      <Window />
      <Footer/> */}
    </Container>
  );
};

export default FixedFrame;

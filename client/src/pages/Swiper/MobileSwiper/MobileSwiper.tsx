import React from "react";
import styled from "styled-components";
import SwiperImageBlock from "../SwiperImageBlock";
import SwiperInfoBlock from "../SwiperInfoBlock";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding-top: 100px;
  gap: 40px;
`;

const Header = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageName = styled.h2`
  font-size: 40px;
`;
const MobileSwiper = () => {
  return (
    <Container>
      <Header>
        {/* <PageName>Swiper</PageName> */}
      </Header>
      <SwiperImageBlock />
      <SwiperInfoBlock />
    </Container>
  );
};

export default MobileSwiper;

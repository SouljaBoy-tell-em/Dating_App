import React, { createContext, useRef } from "react";
import styled from "styled-components";

import SwiperStore from "../../shared/store/swiperStore";

import OurSwiper from "./components/OurSwiper";
import Desription from "./components/Desription";

const Container = styled.div`
  height: 100vh;
  max-height: 1200px;
  background-color: #ffffff;
  position: relative;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding-top: 10px;
  padding-left: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 20px;
  border: 20px solid #d2d2d2;
`;

interface State {
  swiperStore: SwiperStore;
}

const swiperStore = new SwiperStore();

const SwiperContext = createContext<State>({
  swiperStore,
});

export {SwiperContext};

swiperStore.getUsers();

const SwiperPage = () => {

  return (
    <Container>
      <SwiperContext.Provider value={{ swiperStore }}>
        <Wrapper>
          <OurSwiper/>
          <Desription />
        </Wrapper>
      </SwiperContext.Provider>
    </Container>
  );
};

export default SwiperPage;

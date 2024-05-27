import React, { createContext, useContext, useRef } from "react";
import styled from "styled-components";

import SwiperStore from "../../shared/store/swiperStore";

import OurSwiper from "./components/OurSwiper";
import Desription from "./components/Desription";
import SwiperFilter from "./components/SwiperFilter";
import { observer } from "mobx-react-lite";
import Context from "../..";
import { ColorTheme } from "../../shared/models/ColorTheme";

const Container = styled.div<{colorTheme:boolean}>`
  height: 100vh;
  max-height: 1200px;
  background-color: ${(props) => (props.colorTheme ? "#202020" : "#ffffff ")};
  position: relative;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background-color;
`;

const Wrapper = styled.div<{colorTheme:boolean}>`
  padding-top: 10px;
  padding-left: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.colorTheme ? "black" : "#ffffff ")};
  border-radius: 20px;
  border: 20px solid #d2d2d2;
  z-index: 100;
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

const SwiperPage = observer(() => {

  const {store} = useContext(Context);


  return (
    <Container colorTheme={store.colorTheme}>
      <SwiperContext.Provider value={{ swiperStore }}>
        <SwiperFilter/>
        <Wrapper colorTheme={store.colorTheme}>
          <OurSwiper/>
          <Desription />
        </Wrapper>
      </SwiperContext.Provider>
    </Container>
  );
});

export default SwiperPage;

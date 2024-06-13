import React, { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";

import SwiperStore from "../../shared/store/swiperStore";
import Context from "../..";

import SwiperLayout from "./SwiperLayout";
import SwiperImageBlock from "./SwiperImageBlock";
import SwiperInfoBlock from "./SwiperInfoBlock";

const Container = styled.div<{ colorTheme: boolean }>`
  height: 100vh;
  min-height: 900px;
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

const Wrapper = styled.div<{ colorTheme: boolean }>`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const SwiperContentContainer = styled.div`
  z-index: 50;
  display: flex;
  margin-top: 340px;
  margin-left: -400px;
  gap: 70px;
`;
interface State {
  swiperStore: SwiperStore;
}

const swiperStore = new SwiperStore();

const SwiperContext = createContext<State>({
  swiperStore,
});

export { SwiperContext };

swiperStore.getUsers();

const SwiperPage = observer(() => {
  const { store } = useContext(Context);
  swiperStore.getUsers();


  return (
    <SwiperContext.Provider value={{ swiperStore }}>
      <Container colorTheme={store.colorTheme}>
        <Wrapper colorTheme={store.colorTheme}>
          <SwiperLayout />
          <SwiperContentContainer>
            <SwiperImageBlock />
            <SwiperInfoBlock />
          </SwiperContentContainer>
        </Wrapper>
      </Container>
    </SwiperContext.Provider>
  );
});

export default SwiperPage;

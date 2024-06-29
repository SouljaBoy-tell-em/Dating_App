import React, { createContext, useState } from "react";
import styled from "styled-components";
import Greeting from "./Slides/Greeting";
import TutorialStore, { Slides } from "../../../shared/store/turorialStore";
import { observer } from "mobx-react-lite";
import MenuSlide from "./Slides/MenuSlide";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface State {
  tutorialStore: TutorialStore;
}

const tutorialStore = new TutorialStore();

const TutorialContext = createContext<State>({
  tutorialStore,
});

export { TutorialContext };

const Tutorial = observer(() => {

  let zIndex = 0;

  const { slide } = tutorialStore;

  if (slide != undefined) {
    switch (slide) {
      case Slides.GREETING:
        zIndex = 1000;
        break;
      case Slides.MENU:
        zIndex = 100;
        break;
    }
  }

  const containerStyles = {
    zIndex: zIndex,
  };

  return (
    <TutorialContext.Provider value={{ tutorialStore }}>
      <Container style={containerStyles}>
        {tutorialStore.slide === Slides.GREETING && <Greeting />}
        {tutorialStore.slide === Slides.MENU && <MenuSlide />}
      </Container>
    </TutorialContext.Provider>
  );
});

export default Tutorial;

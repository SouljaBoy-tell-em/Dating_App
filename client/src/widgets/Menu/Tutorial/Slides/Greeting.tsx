import React, { useContext, useState } from "react";
import styled from "styled-components";
import AnimatedText from "../AnimatedText";
import { observer } from "mobx-react-lite";
import { TutorialContext } from "../Tutorial";
import Context from "../../../..";
import { Slides } from "../../../../shared/store/turorialStore";

const Container = styled.div`
  width: 70%;
  min-height: 300px;
`;

const ButtonContainer = styled.div<{ isVisible: boolean }>`
  margin-top: 20px;
  display: flex;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: 0.5s;
  gap: 20px;
`;

const TryButton = styled.div`
  border-radius: 15px;
  background-color: white;
  color: black;
  font-weight: 600;
  font-size: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const SkipButton = styled.div`
  border-radius: 15px;
  border: 5px solid white;
  color: white;
  font-weight: 600;
  font-size: 30px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Greeting = observer(() => {
  const { tutorialStore } = useContext(TutorialContext);
  const { store } = useContext(Context);

  const index = tutorialStore.indexOfAnimation?.get(Slides.GREETING) ?? 0;
  const nextAnimation = () => {
    tutorialStore.nextAnimation(Slides.GREETING);
  };

  return (
    <Container>
      <AnimatedText
        text="Hi! Congratulations on the successful registration on the dating site
        «Phystech Date»!"
        callback={() => {
          nextAnimation();
        }}
      />
      {tutorialStore.getAnimationIndex(Slides.GREETING) > 0 && (
        <AnimatedText
          text="Let me tell you what features are on our site"
          callback={() => {
            nextAnimation();
          }}
        />
      )}

      <ButtonContainer isVisible={index > 1}>
        {index > 1 && (
          <>
            <TryButton
              onClick={() => {
                tutorialStore.setSlide(Slides.MENU);
              }}
            >
              Try it!
            </TryButton>
            <SkipButton
              onClick={() => {
                store.setTutorial(false);
              }}
            >
              Skip
            </SkipButton>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
});

export default Greeting;

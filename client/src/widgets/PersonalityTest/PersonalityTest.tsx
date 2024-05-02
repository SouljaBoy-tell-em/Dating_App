import React, { useState } from "react";
import styled from "styled-components";

import QuizBlock from "./components/QuizBlock";
import StartBlock from "./components/StartBlock";
import "./Styles.css";

const Container = styled.div``;

const PersonalityTest = () => {
  const [isStarted, setStarted] = useState(false);

  return (
    <Container>
      {!isStarted ? <StartBlock handleStart={setStarted} /> : <QuizBlock />}
    </Container>
  );
};

export default PersonalityTest;

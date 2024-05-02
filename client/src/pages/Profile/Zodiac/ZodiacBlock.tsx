import React, { useState } from "react";
import styled from "styled-components";

import ZodiacRing from "../../../widgets/Zodiac/ZodiacRing";

const Container = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ZodiacWrapper = styled.div`
  margin-top: 50px;
`;

const RotateButton = styled.button`
    font-size: 40px;
    border: 0;
    background-color: #0606af;
    color:#ffffff;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:active{
        transform: scale(1.05);
    }
    &:hover{
        background-color: #0c0cf1
    }
`;

const ZodiacBlock = () => {
  const [isRotate, setRotate] = useState(false);
  const [angle, setAngle] = useState(0);

  return (
    <Container>
      <ZodiacWrapper>
        <ZodiacRing isRotate={isRotate} setAngle={setAngle}/>
      </ZodiacWrapper>
      {!isRotate ? (
        <RotateButton onClick={()=>setRotate(true)}>Start!</RotateButton>
      ) : (
        <RotateButton onClick={()=>setRotate(false)}>Stop</RotateButton>
      )}
    </Container>
  );
};

export default ZodiacBlock;

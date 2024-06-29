import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Container = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  margin-left: 100px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 50%;
`;

const InnerCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 50;
`;

const ImgOut = styled.img`
  width: 500px;
  height: 500px;
  z-index: 10;
`;

interface ZodiacRingInterface {
  isRotate: boolean;
  setAngle: (angle: number) => void;
}

const ZodiacRing: React.FC<ZodiacRingInterface> = ({ isRotate, setAngle }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    if (isRotate) {
      controls.start({
        rotate: [0, 360],
        transition: {
          duration: 6,
          repeat: Infinity, 
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [isRotate, controls]);

  return (
    <Container>
      <motion.div
        ref={ref}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: "40",
        }}
        initial={{ rotate: 0 }}
        animate={controls}
      >
        <Img src="/images/zodiac.jpg" alt="Zodiac" />
      </motion.div>

      <InnerCircle>
        <Img src="/images/zodiac.jpg" alt="Zodiac" />
      </InnerCircle>
      <ImgOut src="/images/zodiac.jpg" alt="Zodiac" />
    </Container>
  );
};

export default ZodiacRing;

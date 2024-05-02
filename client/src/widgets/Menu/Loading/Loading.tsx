import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { observer } from "mobx-react-lite";
import { FaHeart } from "react-icons/fa";

import Context from "../../..";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  position: absolute;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  opacity: 0.7;
`;

const Label = styled.div`
  font-size: 50px;
`;

const Loading = observer(() => {
  return (
    <Container>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: 200,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaHeart size={150} color="red" />
      </motion.div>
    </Container>
  );
});

export default Loading;

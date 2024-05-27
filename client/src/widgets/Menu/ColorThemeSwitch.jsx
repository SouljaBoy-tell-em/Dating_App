import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Store from "../../shared/store/store";
import Context from "../..";

const Switch = styled.button`
  border: 0;
  border-radius: 16px;
  width: 70px;
  height: 32px;
  padding: 0 2px;
  display: flex;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0px 0px 3px 3px ${(props) => (!props.toggled ? "#ecb4ff" : "black")};

  &:active {
    transform: scale(1.1);
  }
`;

const Ball = styled(motion.div)`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background-color: ${(props) => (!props.toggled ? "#ecb4ff" : "black")};
  transition: background-color 0.3s;
`;

const ballVariants = {
  open: {
    x: 38,
  },
  closed: {
    x: 0,
  },
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    visibility: "visible",
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    visibility: "hidden",
  },
};

const ToggleSwitch = observer(() => {
  const [toggled, setToggled] = useState(false);
  const { store } = useContext(Context);

  const handleToggle = () => {
    setToggled(!toggled);
    store.setColorTheme(!store.colorTheme);
  };

  return (
    <motion.li variants={variants} className="menu-li">
      {" "}
      <Switch toggled={store.colorTheme} onClick={handleToggle}>
        <Ball
          toggled={store.colorTheme}
          variants={ballVariants}
          initial="closed"
          animate={toggled ? "open" : "closed"}
        />
      </Switch>
    </motion.li>
  );
});

export default ToggleSwitch;

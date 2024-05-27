import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { ColorTheme } from "../../shared/models/ColorTheme";
import ColorThemeSwitch from "./ColorThemeSwitch";
import styled from "styled-components";

const SwitchContainer = styled.div`
  margin-top: 50px;
`;

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    visibility: "visible",
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    visibility: "hidden",
  },
};

export const Navigation = () => (
  <>
    <motion.ul variants={variants} className="menu-ul">
      {itemIds.map((i) => (
        <MenuItem i={i} key={i} />
      ))}
      <SwitchContainer>
        <ColorThemeSwitch />
      </SwitchContainer>
    </motion.ul>
  </>
);

const itemIds = [0, 1, 2, 3];

import { Outlet } from "react-router-dom";
import * as React from "react";
import { useRef, useContext } from "react";
import { motion, sync, useCycle } from "framer-motion";

import { observer } from "mobx-react-lite";

import Context from "../..";

import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

import "./style.css";
import Loading from "./Loading/Loading";


const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Menu = observer(() => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const { store } = useContext(Context);

  return (
    <>
      <motion.nav
        className="menu-nav"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div className="menu-background" variants={sidebar} />
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
      {store.isLoading && <Loading />}
      <Outlet />
    </>
  );
});

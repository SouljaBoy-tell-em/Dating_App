import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    visibility: "visible"
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    visibility: "hidden"

  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "#6600ff"];

const routes = ["/", "/NoSecChat", "/confirmEmail", "/newChat", "/NotFound", "/createProfile"];
const text = ["Main Page", "Gray chat", "Confirm email", "Color chat", "Not found", "Create profile"];

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[1]}` };
  return (
    <Link to={routes[i]} style={{ textDecoration: "none" }}>
      <motion.li
        className="menu-li"
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-placeholder" style={style} />
        <div className="text-placeholder" style={style} >{text[i]}</div>
      </motion.li>
    </Link>
  );
};

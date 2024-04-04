import React, { useState } from "react";
import styled from "styled-components";
import "./Messege.css";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Container = styled.div`
  text-align: left;
  padding: 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px;
`;

const Messege = (props: any) => {
  const [isHover, setHover] = useState(false);

  return (
    <Container
      className="messege"
      onMouseEnter={() => {setHover(true)}}
      onMouseLeave={() => {setHover(false)}}
    >
      {props.text} 
      {isHover ? <MdEdit className="messege-icon" size={20} /> : ""}
      {isHover ? <TiDelete className="messege-icon" size={20} /> : ""}
    </Container>
  );
};

export default Messege;

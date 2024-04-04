import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import "./Footer.css";

const Container = styled.div`
  position: fixed;
  top: calc(80px + 10vh + 500px);
  height: 20vh;
  width: 100%;
  background-color: #9403f5;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Input = styled.input`
  position: relative;
  background-color: aliceblue;
  width: 300px;
  height : 35px;
  border-radius: 5px;
  margin-top: 10px;
  padding-left: 10px;
  box-shadow: 0 0 1px 1px;
  outline: none;
  border: 1px solid #c8c8c8;
`;

const Footer = () => {
  return (
    <Container>
      <Input placeholder="Напишите сообщение..."/>
      <IoSend size={30} color="" className="send-icon"/>
    </Container>
  );
};

export default Footer;

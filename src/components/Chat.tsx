import styled from "styled-components";
import "../css/chat.css";
import { GoPaperclip } from "react-icons/go";
import { FiCamera } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { useState } from "react";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  border: 1px double #c8c8c8;
  box-shadow: 0 0 0.5px 0.5px #d0d0d0;
`;

const Footer = styled.div`
  width: 100%;
  height: 11%;
  background-color: #fafbfc;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #c8c8c8;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #c8c8c8;
  border-top: 0;
  border-left: 0;
  border-right: 0;
`;

const Input = styled.input`
  height: 60%;
  width: 70%;
  border-radius: 6px;
  border: 1px solid #c8c8c8;
  background-color: #ffffff;
  outline: none;
  padding-left: 10px;
  padding-right: 60px;
`;

const Icon = styled.div`
  color: #878587;
  transition: all 0.1s;
  &:hover {
    color: #575757;
  }
`;

const PaperclipMenu = styled.div``;

const MessegeContainer = styled.div`
  position: absolute;
  width: 100%;
  top: calc(10% + 1px);
  height: 79%;
  background-color: #ffffff;
  overflow-y: auto;
  /* overflow: hidden; */
`;

const Chat = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Header />
        <MessegeContainer>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p> 
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>
          <p>Text</p>          
          <p>Text</p>
          <p>Text</p>
        </MessegeContainer>
        <Footer>
          <Icon
            onMouseOver={() => {
              setOpen(true);
            }}
            onMouseOut={() => {
              setOpen(false);
            }}
          >
            <GoPaperclip
              size={30}
              style={{
                marginLeft: "10px",
                marginRight: "10px",

                cursor: "pointer",
              }}
            />
          </Icon>
          <PaperclipMenu
            className={`popclip-menu ${isOpen ? "active" : ""}`}
          ></PaperclipMenu>
          <Input placeholder="Напишите сообщение..."></Input>
          <FiCamera
            className="chat-icon"
            size={25}
            style={{
              marginLeft: "-70px",
              cursor: "pointer",
            }}
          />
          <FaRegSmile
            className="chat-icon"
            size={25}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
          <HiOutlineMicrophone
            className="chat-icon"
            size={30}
            style={{
              marginLeft: "20px",
              cursor: "pointer",
            }}
          />
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Chat;

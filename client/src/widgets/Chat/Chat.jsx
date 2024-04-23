import { React, useContext, useState } from "react";
import styled from "styled-components";

import { ChatContext } from "../../pages/NoSecPage/NoSecPage";

import { observer } from "mobx-react-lite";

const Container = styled.div`
  width: 50%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const MessegeBlock = styled.div`
  height: 50%;
  background-color: #dfdfdf;
  border-radius: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 70%;
  gap: 10px;
`;

const Messege = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  width: min-content;
  display: flex;
  flex-direction: column;
`;

const MessegeWrapper = styled.div`
  display: flex;
  width: max-content;
  gap: 10px;
  position: relative;
`;

const Name = styled.p`
  font-size: medium;
  font-weight: 800;
`;

const ChatName = styled.p`
  font-size: medium;
  font-weight: 800;
`;
const Chat = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const { chatStore } = useContext(ChatContext);

  return (
    <Container>
      <ChatName>
        {chatStore.chatName}
      </ChatName>
      <MessegeBlock>
        {chatStore.messages.map(
          (value, index) =>
            value.chatId == chatStore.chatId && (
              <Messege key={value.id} style={{ display: "flex", gap: "10px" }}>
                <Name>{value.sender}</Name>
                <MessegeWrapper>
                  <p>{value.content}</p>
                  <button
                    onClick={() => {
                      chatStore.delete(value);
                    }}
                  >
                    Delete
                  </button>
                </MessegeWrapper>
              </Messege>
            )
        )}
      </MessegeBlock>

      <button onClick={chatStore.getAll}>Get All</button>
      <Wrapper>
        <input
          placeholder="Введите имя"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            chatStore.join(name);
          }}
        >
          Join
        </button>
      </Wrapper>
      <Wrapper>
        <input
          placeholder="Введите сообщение"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            chatStore.send(message);
          }}
        >
          Send
        </button>
      </Wrapper>
    </Container>
  );
};

export default observer(Chat);

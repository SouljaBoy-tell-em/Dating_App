import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaReply } from "react-icons/fa";

import { ChatContext } from "../../pages/GrayChat/GrayChat";
import { MessageDTO } from "../../shared/models/chat/MessageDTO";
import Context from "../..";
import VideoPlayer from "./VideoPlayer";

const Container = styled.div`
  padding: 5px;
  border-radius: 5px;
  width: calc(100% - 10px);
  display: flex;
  position: relative;
`;

const Messege = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  width: min-content;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Name = styled.p`
  font-size: medium;
  font-weight: 800;
`;

const TextMessage = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 300px;
`;

interface MessageInterface {
  value: MessageDTO;
}

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
  top: 10px;
  position: absolute;
`;

const IconButton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  &:active {
    transform: scale(1.05);
  }
`;

const Time = styled.p`
  font-size: 15px;
  font-weight: 500;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  width: 400px;
`;

const Image = styled.img`
  width: 100%;
`;

const AvatarImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;
const Message: React.FC<MessageInterface> = ({ value }) => {
  const { chatStore } = useContext(ChatContext);
  const [isChoosed, setChoosed] = useState(false);
  const { store } = useContext(Context);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const time = new Date(value.time);
  const formattedTime = `${time.getHours()}:${
    (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
  }`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setChoosed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <Container
      ref={containerRef}
      style={{
        justifyContent:
          value.sender.email === store.userInfo.username ? "right" : "left",
        background: isChoosed ? "rgba(0, 0, 0, 0.1)" : "0",
      }}
      onClick={() => {
        setChoosed(true);
      }}
    >
      {isChoosed && (
        <IconsContainer
          style={{
            left:
              value.sender.email === store.userInfo.username
                ? "10px"
                : "calc(100% - 120px)",
          }}
        >
          <IconButton>
            <MdModeEdit size={30} />
          </IconButton>
          <IconButton
            onClick={() => {
              chatStore.delete(value);
            }}
          >
            <MdDelete size={30} />
          </IconButton>
          <IconButton>
            <FaReply size={30} />
          </IconButton>
        </IconsContainer>
      )}
      <Messege
        key={value.id}
        style={{
          display: "flex",
          gap: "10px",
          background:
            value.sender.email === store.userInfo.username
              ? "#ffffff"
              : "#e9bdf7",
        }}
      >
        <TopContainer
          style={{
            flexDirection:
              value.sender.email === store.userInfo.username
                ? "row"
                : "row-reverse",
          }}
        >
          <Time>{formattedTime}</Time>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection:
                value.sender.email === store.userInfo.username
                  ? "row"
                  : "row-reverse",
            }}
          >
            <Name>{value.sender.email}</Name>
            {value.sender.avatarURL !== "" && (
              <AvatarImage src={value.sender.avatarURL} />
            )}
          </div>
        </TopContainer>

        <FileContainer>
          {value.files?.map((file) => (
            <ImageContainer>
              {file.fileType === "video/mp4" && (
                <VideoPlayer url={file.fileURL} />
              )}
              {file.fileType === "image/jpeg" && (
                <Image src={file.fileURL} alt={file.id.toString()} />
              )}
            </ImageContainer>
          ))}
        </FileContainer>
        <TextMessage>{value.content}</TextMessage>
      </Messege>
    </Container>
  );
};

export default Message;

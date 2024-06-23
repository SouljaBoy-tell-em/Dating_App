import React, { useContext, useState, ChangeEvent } from "react";
import styled from "styled-components";

import { MdDelete } from "react-icons/md";

import { LuPaperclip } from "react-icons/lu";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

import ChatInput from "./ChatInput";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  @media (max-width:1224px){
    width: calc(100% - 20px);
  }
  background-color: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const SendButton = styled.button`
  background: white;
  border-radius: 50%;
  border: 0;
  width: 35px;
  height: 35px;
  @media (max-width:1224px){
    scale: 1.3;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active {
    transform: scale(1.1);
  }
`;

const InputClip = styled.label`
  margin-top: 5px;
  color: gray;
  cursor: pointer;
  @media (max-width:1224px){
    scale: 1.3;
    margin-left: 0px;

  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 1224px) {
    border-radius: 0;
    width: calc(100%);
  }

`;

const DeleteBotton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const SendImage = styled.img``;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  gap:5px;
  border-radius: 20px;
  @media (max-width: 1224px) {
    border-radius: 10px;
    width: calc(100% -1 0px);
    background-color: white;
  }
`;

const BottomBlock: React.FC = () => {
  const { chatStore } = useContext(ChatContext);
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <ChatInputWrapper>
          <ChatInput setMessage={setMessage} message={message}  />
          <InputClip>
            <LuPaperclip size={30} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="video/mp4, image/jpeg"
              onChange={handleFileUpload}
            />
          </InputClip>
        </ChatInputWrapper>

        {files.map((file, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <p>{file.name}</p>
            <DeleteBotton
              onClick={() => {
                const updatedFiles = [...files];
                updatedFiles.splice(index, 1);
                setFiles(updatedFiles);
              }}
            >
              <MdDelete size={25} color="#7e0000" />
            </DeleteBotton>
          </div>
        ))}
      </InputWrapper>

      <SendButton
        onClick={() => {
          if (message !== "" || files.length > 0) {
            chatStore.send(message, files);
            setMessage("");
            setFiles([]);
            chatStore.setRowNumber(1);
          }

        }}
      >
        <SendImage src="/images/chat/Forward.png" />
      </SendButton>
    </Wrapper>
  );
};

export default BottomBlock;

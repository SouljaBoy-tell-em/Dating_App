import React, { useContext, useState, ChangeEvent } from "react";
import styled from "styled-components";

import { MdDelete } from "react-icons/md";

import { IoSend } from "react-icons/io5";
import { LuPaperclip } from "react-icons/lu";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

import ChatInput from "./ChatInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 642px;
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
  margin-left: -40px;
  margin-right: 20px;
  color: gray;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DeleteBotton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const GetAllButton = styled.button`
  opacity: 0;
  background-color: #00003c;
  color: white;
  font-size: 20px;
  font-weight: 600;
  padding: 4px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    transform: scale(1.05);
  }
  &:hover {
    opacity: 1;
  }
`;

const SendImage = styled.img``;

const BottomBlock: React.FC = () => {
  const { chatStore } = useContext(ChatContext);
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ChatInput setMessage={setMessage} message={message}/>
          <InputClip>
            <LuPaperclip size={30} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="video/mp4, image/jpeg"
              onChange={handleFileUpload}
            />
          </InputClip>
        </div>

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
          chatStore.send(message, files);
          setMessage("");
          setFiles([]);
        }}
      >
        <SendImage src="/images/chat/Forward.png" />
      </SendButton>
      <GetAllButton onClick={chatStore.getAll}>Get All</GetAllButton>
    </Wrapper>
  );
};

export default BottomBlock;

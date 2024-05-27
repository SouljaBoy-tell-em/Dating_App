import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { UserPageContext } from "../UserPage";
import { LuPaperclip } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #ffffff;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 100px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const InputClip = styled.label`
  color: gray;
  cursor: pointer;
`;

const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const DeleteBotton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const LoadedFiles = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const AddPost = observer(() => {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const { userPageStore } = useContext(UserPageContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (text.trim()) {
      userPageStore.makePost(text, files);
      setText("");
    } else {
      alert("Post cannot be empty");
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <Container>
      <PostForm onSubmit={handleSubmit}>
        <h2>Create a new Post</h2>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <BottomBlock>
          <Button type="submit">Post</Button>
          <InputClip>
            <LuPaperclip size={30} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="video/mp4, image/jpeg"
              onChange={handleFileUpload}
            />
          </InputClip>
        </BottomBlock>
        {files.length>0 && <LoadedFiles>
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
        </LoadedFiles>}
      </PostForm>
    </Container>
  );
});

export default AddPost;

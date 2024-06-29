import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { UserPageContext } from "../UserPage";
import Context from "../../..";
import { getImageURL } from "../../../shared/http";

import Post from "./Post";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -20px;
  /* overflow-y: auto; */
  /* max-height: 800px; */
`;

const Posts = observer(() => {
  const { userPageStore } = useContext(UserPageContext);
  const { store } = useContext(Context);

  useEffect(() => {
    userPageStore.getAllPosts();
  }, [userPageStore]); // Добавил userPageStore как зависимость, чтобы избежать предупреждений

  return (
    <Container>
      {userPageStore.Posts.slice()
        .reverse()
        .map((value, index) => (
          <Post
            post={value}
            isOurPage={store.user.email === userPageStore.email}
            avatarURL={getImageURL(userPageStore.profileInfo.photoURL)}
          />
        ))}
    </Container>
  );
});

export default Posts;

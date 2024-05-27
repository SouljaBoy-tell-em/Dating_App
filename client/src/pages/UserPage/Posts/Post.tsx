import React, { useContext, useState } from "react";
import { parseISO, format } from "date-fns";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";

import { FileDTO } from "../../../shared/models/files/FileDTO";
import ChatService from "../../../shared/services/ChatService";
import LikeButton from "./LikeButton";
import { UserPageContext } from "../UserPage";
import { PostDTO } from "../../../shared/models/userPage/PostDTO";

const PostContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 20px;
  width: 300px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 15px;
`;

const Username = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 10px;
`;

const PostDate = styled.small`
  color: #999;
  font-size: 12px;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentButton = styled.button`
  background-color: #28a745;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #218838;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

const PostImage = styled.img`
  width: 300px;
  box-shadow: 0 0 2px 2px gray;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const LikeBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const LikeNumber = styled.p`
  color: red;
  font-size: 20px;
  font-weight: 600;
`;

interface PostInterface {
  post: PostDTO;
  isOurPage: boolean;
  avatarURL:string
}

const Post: React.FC<PostInterface> = ({ post, isOurPage, avatarURL }) => {
  const dateObj = parseISO(post.time);
  const formattedDate = format(dateObj, "HH:mm MMMM dd ");

  const { userPageStore } = useContext(UserPageContext);
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      userPageStore.deletePost(post.id);
    }
  };

  return (
    <PostContainer>
      <TopContainer>
        <UserInfo>
          <Avatar
            src={avatarURL||"http://localhost:3000/images/NoAvatar.jpg"}
            alt={`${post.email}'s avatar`}
          />
          <Username>{post.email}</Username>
        </UserInfo>
        { isOurPage &&
          <DeleteButton>
            <MdDelete size={25} color="#black" onClick={handleDelete} />
          </DeleteButton>
        }
      </TopContainer>

      <PostContentContainer>
        {post.files?.length > 0 &&
          post.files.map((value, index) => (
            <PostImage
              src={ChatService.getImageUrl(value.fileURL)}
              key={index}
            />
          ))}
        <PostContent>{post.content}</PostContent>
      </PostContentContainer>
      <BottomContainer>
        <PostDate>{formattedDate}</PostDate>
        <LikeBlock>
          {post.likeNumber > 1 && <LikeNumber>{post.likeNumber}</LikeNumber>}
          <LikeButton postId={post.id} isLiked={post.liked} />
        </LikeBlock>
      </BottomContainer>
    </PostContainer>
  );
};

export default Post;

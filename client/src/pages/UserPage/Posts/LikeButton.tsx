import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { UserPageContext } from "../UserPage";

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Button = styled.button`
  background-color: rgb(255, 255, 255, 0);
  border: 0;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  pointer-events: none;
`;

interface LikeButtonInterface{
  postId:number;
  isLiked:boolean;
}

const LikeButton:React.FC<LikeButtonInterface> = ({postId, isLiked}) => {
  const [displayHeart, setDisplayHeart] = useState(false);
  const {userPageStore} = useContext(UserPageContext);
  const [isClicked, setClicked] = useState(isLiked);

  const handleLikeClick = () => {
    if (!isClicked) {
      // Only show the animation when "liking", not when "unliking".
      setDisplayHeart(true);
      setTimeout(() => setDisplayHeart(false), 700); // Hide the heart after the animation duration
      userPageStore.likePost(postId);
    } else {
      userPageStore.deleteLikePost(postId);
    }

    setClicked(!isClicked);
  };

  return (
    <Container>
      <Button onClick={handleLikeClick}>
        <FaHeart size={30} color={isClicked ? "red" : "gray"} />
      </Button>
      <AnimatePresence>
        {displayHeart && (
          <FloatingHeart
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -40, x: 20 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.7 }}
            key="floating-heart"
          >
            <FaHeart size={40} color="red" />
          </FloatingHeart>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default LikeButton;

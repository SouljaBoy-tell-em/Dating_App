import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styled from "styled-components";

import { getImageURL } from "../../shared/http";

import { SwiperContext } from "./SwiperPage";
import SwiperFilter from "./SwiperFilter";

const SwiperContainer = styled.div`
  z-index: 100;
  width: 400px;
  height: 520px;
  background-color: aliceblue;
  border-radius: 20px;
  position: relative;
`;

const SwiperImage = styled.img`
  z-index: 100;
  width: 400px;
  height: 520px;
  position: absolute;
  border-radius: 20px;
  object-fit: cover;
`;

const SwiperColorDiv = styled.div`
  z-index: 50;
  width: 100%;
  height: 100%;
  background-color: #baa6b8;
  border-radius: 20px;
  top: 30px;
  left: -30px;
  position: absolute;
`;

const SwiperBottomBlock = styled.div`
  z-index: 150;
  height: 115px;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: rgb(255, 255, 255, 0.8);
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #baa6b8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImageDeny = styled.img`
  width: 31px;
  height: 36px;
`;

const IconImageHeart = styled.img`
  width: 33px;
  height: 33px;
`;

const ContainerForIcons = styled.div`
  margin-right: 25px;
  display: flex;
  width: min-content;
  gap: 30px;
`;

const TextBlock = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
`;

const PersonName = styled.p`
  font-size: 30px;
  font-weight: 500;
`;

const LocationName = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const IconButton = styled.button`
  border-radius: 50%;
  border: 0;
  background-color: 0;
  transition: all 0.3s;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;

const LocationBlock = styled.div`
  display: flex;
`;

const LocationIcon = styled.img`
  margin-left: -8px;
  margin-right: 4px;
`;

const SwiperFilterImage = styled.img`
  position:absolute;
  top:0;
  right:0;
  border-top-right-radius:15px;
  border-bottom-left-radius:15px;
  width:70px;
  height:70px;
  z-index:200;
  background-color: rgb(255,255,255, 0.7);
  transition: 0.3s all;
  &:hover{
    background-color: rgb(255,255,255, 0.9);
  }
`;

const UnstyledButton = styled.button`
  background-color:0;
  border:0;
  cursor:pointer;
`;

const SwiperFilterWrapper = styled.div`
  background-color:rgb(255,255,255,0.7);
  position:fixed;
  width:100%;
  height:100vh;
  z-index:3000;
  top:0;
  left:0;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const SwiperImageBlock = observer(() => {
  const { swiperStore } = useContext(SwiperContext);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleDislike = async () => {
    await swiperStore.ratePerson(swiperStore.users[0]?.email, false);
    const response = await swiperStore.getUsers();
    if (response) {
      window.alert(response);
    }
  };

  const handleLike = async () => {
    await swiperStore.ratePerson(swiperStore.users[0]?.email, true);
    const response = await swiperStore.getUsers();
    if (response) {
      window.alert(response);
    }
  };  

  const handleFilterWrapperClick = (e:any) => {
    if (e.target === e.currentTarget) {
      setFilterOpen(false);
    }
  }

  return (
    <SwiperContainer>
      <SwiperImage src={getImageURL(swiperStore.users[0]?.imageAvatarUrl)} />
      <UnstyledButton onClick={()=>setFilterOpen(true)}>       
         <SwiperFilterImage src="/images/swiper/Filter.svg"/>
      </UnstyledButton>
      {isFilterOpen && 
      <SwiperFilterWrapper onClick={handleFilterWrapperClick}>
        <SwiperFilter onClose={()=>setFilterOpen(false)}/>
      </SwiperFilterWrapper>}
      <SwiperColorDiv />
      <SwiperBottomBlock>
        <TextBlock>
          <PersonName>
            {swiperStore.users[0]?.firstname}, {swiperStore.users[0]?.age}
          </PersonName>
          <LocationBlock>
            <LocationIcon src="/images/swiper/Location.png" />
            <LocationName>(Location)</LocationName>
          </LocationBlock>
        </TextBlock>
        <ContainerForIcons>
          <IconButton>
            <IconContainer>
              <IconImageDeny
                src="/images/swiper/Deny.png"
                onClick={async ()=>{await handleDislike();}}
              />
            </IconContainer>
          </IconButton>
          <IconButton>
            <IconContainer>
              <IconImageHeart
                src="/images/swiper/Heart.png"
                onClick={async ()=>{await handleLike();}}
              />
            </IconContainer>
          </IconButton>
        </ContainerForIcons>
      </SwiperBottomBlock>
    </SwiperContainer>
  );
});

export default SwiperImageBlock;

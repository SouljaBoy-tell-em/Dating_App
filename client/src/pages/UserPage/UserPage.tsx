import React, { createContext, useContext, useEffect } from "react";
import styled from "styled-components";
import UserImage from "./UserImage";
import Posts from "./Posts/Posts";
import UserPageStore from "../../shared/store/userPageStore";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AddPost from "./Posts/AddPost";
import Context from "../..";
import ChatService from "../../shared/services/ChatService";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  background-color: #ffffff;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  position: absolute;
  top: 100px;
`;

const GeneralWrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const GeneralInfo = styled.div`
  box-shadow: 0 0 2px 2px gray;
  padding: 30px;
  border-radius: 15px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.p`
  font-size: 35px;
  font-weight: 800;
`;

const Param = styled.p`
  font-size: 25px;
  font-weight: 600;
`;

const ParamValue = styled.p`
  font-size: 25px;
  font-weight: 400;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const AnotherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
interface State {
  userPageStore: UserPageStore;
}

const userPageStore = new UserPageStore();

const UserPageContext = createContext<State>({
  userPageStore,
});

export { UserPageContext };

const UserPage = observer(() => {
  const { email } = useParams<{ email: string }>();
  const emailAddress = email ? email : "";
  const {store} = useContext(Context);
  useEffect(() => {
    userPageStore.setEmail(emailAddress);
    userPageStore.getAllPosts();
    userPageStore.getProfileInfo();
  }, [emailAddress]);

  return (
    <Container>
      <UserPageContext.Provider value={{ userPageStore }}>
        <Wrapper>
          <AnotherWrapper>
            <GeneralWrapper>
              <UserImage src={ChatService.getImageUrl(userPageStore.profileInfo.photoURL)}/>
              <GeneralInfo>
                <Name>{userPageStore.profileInfo.firstname} {userPageStore.profileInfo.lastname}</Name>
                <InfoContainer>
                  <Param>Birthday: </Param>
                  <ParamValue>{userPageStore.profileInfo.birthday}</ParamValue>
                </InfoContainer>
                <InfoContainer>
                  <Param>Country: </Param>
                  <ParamValue>Russia</ParamValue>
                </InfoContainer>
                <InfoContainer>
                  <Param>Gender: </Param>
                  <ParamValue>{userPageStore.profileInfo.isMan ? "Man" : "Woman"}</ParamValue>
                </InfoContainer>
                <InfoContainer>
                  <Param>Status: </Param>
                  <ParamValue>divorsed</ParamValue>
                </InfoContainer>
              </GeneralInfo>
            </GeneralWrapper>

            {store.user.email===userPageStore.email&&<AddPost/>}
          </AnotherWrapper>

          <Posts />
        </Wrapper>
      </UserPageContext.Provider>
    </Container>
  );
});

export default UserPage;

import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import { useContext, useEffect } from "react";

import Swiper from "swiper";

import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import { RequireAuth } from "./features/RequireAuth";

import Main from "./pages/Main/Main";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import { Menu } from "./widgets/Menu/Menu";

import CreateProfile from "./pages/CreateProfile/CreateProfile";
import Profile from "./pages/Profile/Profile.jsx";
import SwiperPage from "./pages/Swiper/SwiperPage";

import License from "./pages/License/License";
import UserPage from "./pages/UserPage/UserPage";

import { AccessLevels } from "./shared/accessLevel/accessLevel";
import ChatPage from "./pages/ChatPage/ChatPage";
import HomePage from "./features/HomePage";
import PersonalityTestPage from "./pages/PersonalityTest/PersonalityTest";

import Context from ".";

const Container = styled.div`
  position: relative;
`;

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="auth" element={<AuthPage />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="confirmEmail"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL1}>
                <ConfirmEmail />
              </RequireAuth>
            }
          />
          <Route index element={<Navigate to="main" />} />
          <Route path="main" element={<Main />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="profile"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="createProfile"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL2}>
                <CreateProfile />
              </RequireAuth>
            }
          />

          <Route
            path="chat"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <ChatPage />
              </RequireAuth>
            }
          />
          <Route
            path="swiper"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <SwiperPage />
              </RequireAuth>
            }
          />
          <Route path="license" element={<License />} />

          <Route
            path="/user/:email"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <UserPage />
              </RequireAuth>
            }
          />

          <Route
            path="/homePage"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <HomePage />
              </RequireAuth>
            }
          />

          <Route
            path="/personalityTest"
            element={
              <RequireAuth accessLevel={AccessLevels.LEVEL3}>
                <PersonalityTestPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default observer(App);

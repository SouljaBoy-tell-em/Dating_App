import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import { useContext, useEffect } from "react";

import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import { RequireAuth } from "./features/RequireAuth";
import ChatPage from "./pages/ChatPage/ChatPage";

import NoSecPage from "./pages/NoSecPage/NoSecPage";
import Main1 from "./pages/Main1/Main1";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import NewChat from "./pages/NewChat/NewChat";
import { Menu } from "./widgets/Menu/Menu";

import Context from ".";
import CreateProfile from "./pages/CreateProfile/CreateProfile";

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
        <Route path="/" element={<Menu/>}>
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="NoSecChat"
            element={
              <RequireAuth>
                <NoSecPage />
              </RequireAuth>
            }
          />
          <Route path="main1" element={<Main1 />} />

          <Route
            path="chat"
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="confirmEmail"
            element={
              <RequireAuth>
                <ConfirmEmail />
              </RequireAuth>
            }
          />
          <Route index element={<Navigate to="main1" />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="newChat" element={<NewChat />} />
          <Route
            path="createProfile"
            element={
              <RequireAuth>
                <CreateProfile/>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default observer(App);

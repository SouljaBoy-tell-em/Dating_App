import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { RequireAuth } from "./features/RequireAuth";
import { useContext, useEffect } from "react";

import Context from ".";
import NoSecPage from "./pages/NoSecPage/NoSecPage";
import Main1 from "./pages/Main1/Main1";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import NewChat from "./pages/NewChat/NewChat";

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/NoSecChat" element={<NoSecPage />} />
        <Route path="/main1" element={<Main1 />} />

        <Route
          path="/chat"
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/confirmEmail"
          element={
            <RequireAuth>
              <ConfirmEmail />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/main1" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/newChat" element={<NewChat/>}/>
      </Routes>
    </Container>
  );
}

export default observer(App);

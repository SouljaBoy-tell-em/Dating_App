import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Route, Routes, Link, Navigate, useParams } from "react-router-dom";

import styled from "styled-components";

import LoginForm from "./components/LoginForm";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import AboutApp from "./pages/AboutApp";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";

import Context from ".";
import PersonalityTest from "./pages/PersonalityTest/PersonalityTest";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store, store.isAuth]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<AboutApp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/PersonalityTest"
          element={
            <PrivateRoute>
              <PersonalityTest />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default observer(App);

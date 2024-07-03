import React, { useState, useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import "./License.css";
import termsAndConditionsText from "./termsAndConditions";
import styled from "styled-components";

const TopContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Header = styled.h2`
  width: max-content;
`;

function HomePage({ setPage, fromPage }) {
  const [showModal, setShowModal] = useState(false);
  const modalContentRef = useRef(null);
  const agreeButtonRef = useRef(null);

  const handleAgree = () => {
    setShowModal(false);
    setPage("welcome");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleScrollToBottom = () => {
    const agreeButton = agreeButtonRef.current;
    agreeButton.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="home-page">
      {/* <button className="button-23" onClick={() => setShowModal(true)}>
        Sign Up
      </button> */}
      (
      <div className="modal">
        {/* <button className="close-button" onClick={handleClose}>
          &#10006;
        </button> */}
        <div className="modal-content" ref={modalContentRef}>
          <TopContainer>
            <Header>TERMS & CONDITIONS</Header>
            <button
              className="button-39 scroll-to-bottom-button"
              onClick={handleScrollToBottom}
            >
              Scroll to Bottom
            </button>
          </TopContainer>
          <p dangerouslySetInnerHTML={{ __html: termsAndConditionsText }}></p>
          <Link to={fromPage}>
            {" "}
            <button
              ref={agreeButtonRef}
              className="agree-button"
              onClick={handleAgree}
            >
              I Agree
            </button>
          </Link>
        </div>
      </div>
      )
      {/* <p className="terms-text">
        By creating an account, you agree to our Terms & Conditions and Privacy
        Policy
      </p> */}
    </div>
  );
}

const License = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const [page, setPage] = useState("home");

  return (
    <div>
      <HomePage setPage={setPage} fromPage={fromPage} />
    </div>
  );
};

export default License;

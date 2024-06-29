import React, { useState, useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import "./License.css";
import termsAndConditionsText from "./termsAndConditions";

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
      <button className="button-23" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      (
      <div className="modal">
        <button className="close-button" onClick={handleClose}>
          &#10006;
        </button>
        <div className="modal-content" ref={modalContentRef}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>TERMS & CONDITIONS</h2>
            <button
              className="button-39 scroll-to-bottom-button"
              onClick={handleScrollToBottom}
            >
              Scroll to Bottom
            </button>
          </div>
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
      <p className="terms-text">
        By creating an account, you agree to our Terms & Conditions and Privacy
        Policy
      </p>
    </div>
  );
}

const License = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  console.log(location.state);

  const [page, setPage] = useState("home");

  return (
    <div>
      <HomePage setPage={setPage} fromPage={fromPage} />
    </div>
  );
};

export default License;

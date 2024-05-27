import React from "react";

const StartBlock = (props) => {
  return (
    <div>
      {" "}
      <div id="start-container">
        <h1>PERSONALITY TEST</h1>
        <button
          id="start-btn"
          class="button-54"
          onClick={() => {
            props.handleStart(true);
          }}
        >
          START
        </button>
      </div>
      <p id="mbtiDescription" class="mbtiDescription">
        <span class="text">
          The Myers-Briggs Type Indicator (MBTI) is a widely used personality
          assessment tool based on the psychological theories of Carl Jung. It
          categorizes individuals into 16 personality types, each represented by
          a combination of four dichotomous preferences:
          <br />
          <br />
          1. Extraversion (E) or Introversion (I)
          <br />
          2. Sensing (S) or Intuition (N)
          <br />
          3. Thinking (T) or Feeling (F)
          <br />
          4. Judging (J) or Perceiving (P)
          <br />
          <br />
          These preferences result in 16 possible personality types, such as
          ISTJ, ENFP, or INFJ, each with its own unique characteristics and
          tendencies. The MBTI is often used to gain insights into individual
          differences in how people perceive the world, make decisions, and
          interact with others. It can be a valuable tool for personal
          development, career counseling, and team-building activities.
        </span>
        <img src="images/c9727b6c89fab8ff726fbd0515bbe53c.png" alt="MBTI Image" />
      </p>
    </div>
  );
};

export default StartBlock;

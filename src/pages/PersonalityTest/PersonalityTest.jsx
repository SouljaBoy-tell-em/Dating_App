import "../PersonalityTest/Styles.css";
import styled from "styled-components";
import {useState } from "react";

const Container = styled.div``;

const StartContainer = styled.div``;

const MbtiDescription = styled.p``;

const StartContent = styled.div``;

const QuizContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
  flex-direction: column;
  gap: 10px;
`;

const Result = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: inline-flex;
  gap: 10px;
`;


const PersonalityTest = () => {
  const [isStarted, setStarted] = useState(false);

  const [numOfQuestion, setNumOfQuestion] = useState(0);

  const [choose, setChoose] = useState(null);

  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(undefined)
  );
  

  const [noChoose, setNoChoose] = useState(false);

  const handlePrev = () => {
    if (numOfQuestion > 0) {
      setChoose(answers[numOfQuestion - 1]);
      setNumOfQuestion(numOfQuestion - 1);
    }
  };
  const handleNext = () => {
    if (numOfQuestion < questions.length && choose != null) {
      answers[numOfQuestion] = choose;
      setAnswers(answers);
      setChoose(answers[numOfQuestion+1]);
      setNumOfQuestion(numOfQuestion + 1);

    } else if (choose == null) {
      setNoChoose(true);
      setTimeout(function() {
        setNoChoose(false);
      }, 500);
    }
  };

  return (
    <Container>
      {!isStarted ? (
        <StartContent>
          <StartContainer className="start-container">
            <h1>PERSONALITY TEST</h1>
            <button
              className="start-btn button-54"
              onClick={() => {
                setStarted(true);
              }}
            >
              START
            </button>
          </StartContainer>
          <MbtiDescription className="mbtiDescription">
            <span className="text">
              The Myers-Briggs Type Indicator (MBTI) is a widely used
              personality assessment tool based on the psychological theories of
              Carl Jung. It categorizes individuals into 16 personality types,
              each represented by a combination of four dichotomous preferences:
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
              tendencies. The MBTI is often used to gain insights into
              individual differences in how people perceive the world, make
              decisions, and interact with others. It can be a valuable tool for
              personal development, career counseling, and team-building
              activities.
            </span>
            <img src="c9727b6c89fab8ff726fbd0515bbe53c.png" alt="MBTI Image" />
          </MbtiDescription>
        </StartContent>
      ) : numOfQuestion === questions.length ? (
        <Result>
          <p>Your MBTI Type: {calculateMBTI(answers)}</p>
        </Result>
      ) : (
        <QuizContent>
          <div>{questions[numOfQuestion]}</div>
          <div className={`inputs ${noChoose ? "active" : ""}`}>
            <input
              type="radio"
              id="yes"
              name="answer"
              value="Yes"
              checked={choose === "Yes"}
              onChange={() => setChoose("Yes")}
            />
            <label for="yes" style={{ marginRight: "10px" }}>
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="answer"
              value="Yes"
              checked={choose === "No"}
              onChange={() => setChoose("No")}
            />
            <label for="no">No</label>
          </div>
          <Buttons>
            <button class="prev-btn" onClick={handlePrev}>
              Previous
            </button>
            <button class="next-btn" onClick={handleNext}>
              {numOfQuestion === questions.length - 1 ? "Show res" : "Next"}
            </button>
          </Buttons>
          <div></div>
        </QuizContent>
      )}
    </Container>
  );
};
export default PersonalityTest;

const questions = [
  "You regularly make new friends.",
  "You prefer to do your chores before allowing yourself to relax.",
  "When making decisions, you focus more on how the affected " +
    "people might feel than on what is most logical or efficient.",
  "You are willing to bend the truth to make someone feel better.",
  "You enjoy experimenting with new and untested approaches.",
  "You like to use organizing tools like schedules and lists.",
  "You enjoy participating in team-based activities.",
  "Your living and working spaces are clean and organized.",
  "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
  "You often allow the day to unfold without any schedule at all.",
  "You enjoy solitary hobbies or activities more than group ones.",
  "You actively seek out new experiences and knowledge areas to explore.",
  "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
  "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
  "You prioritize and plan tasks effectively, often completing them well before the deadline.",
  "You are not too interested in discussions about various interpretations of creative works.",
  "You find the idea of networking or promoting yourself to strangers very daunting.",
  "Complex and novel ideas excite you more than simple and straightforward ones.",
];

function calculateMBTI(answers) {
  let result = "";

  // Introversion/Extraversion
  let IE_count = 0;
  if (answers[0] == "Yes") IE_count++;
  if (answers[6] == "Yes") IE_count++;
  if (answers[12] == "No") IE_count++;
  if (answers[14] == "Yes") IE_count++;
  if (answers[18] == "No") IE_count++;
  result += IE_count >= 3 ? "E" : "I";

  // Sensing/Intuition
  let SN_count = 0;
  if (answers[4] == "Yes") SN_count++;
  if (answers[9] == "Yes") SN_count++;
  if (answers[13] == "Yes") SN_count++;
  if (answers[17] == "No") SN_count++;
  if (answers[19] == "Yes") SN_count++;
  result += SN_count >= 3 ? "N" : "S";

  // Thinking/Feeling
  let TF_count = 0;
  if (answers[2] == "Yes") TF_count++;
  if (answers[3] == "Yes") TF_count++;
  if (answers[8] == "Yes") TF_count++;
  if (answers[10] == "Yes") TF_count++;
  if (answers[15] == "No") TF_count++;
  result += TF_count >= 3 ? "F" : "T";

  // Judging/Perceiving
  let JP_count = 0;
  if (answers[1] == "No") JP_count++;
  if (answers[5] == "No") JP_count++;
  if (answers[7] == "No") JP_count++;
  if (answers[11] == "Yes") JP_count++;
  if (answers[16] == "No") JP_count++;
  result += JP_count >= 3 ? "P" : "J";

  return result;
}

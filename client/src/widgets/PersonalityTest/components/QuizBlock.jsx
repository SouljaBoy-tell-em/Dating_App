/* eslint-disable max-len */
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: calc(100% - 350px);
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
const QuestionsBlock = styled.div``;
const ResultBlock = styled.div`

  background-color: #f0f0f0;
  color: black;
  padding: 20px;
  border-radius: 10px;
`;
const QuestionsContainer = styled.div`
  width: 100%;
  min-height:500px;
  position: relative;
  background-color: #dabfde;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: "Bodoni MT";
  font-size: 150%; /* Увеличение размера шрифта на 150% */


  .question-block {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid black;
    text-align: center;
  }

  .question {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .answer-container {
    display: flex;
    justify-content: space-around;
    font-weight: bold; /* Надписи Yes и No жирными */
  }
`;

const QuizBlock = () => {
  const questionsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [isFinished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage * questionsPerPage < questions.length) {
      const nextPage = currentPage + 1;
      for (
        let i = currentPage * questionsPerPage;
        i < Math.min((currentPage + 1) * questionsPerPage, questions.length);
        i++
      ) {
        if (answers[i] === null) {
          alert("Please answer all questions before proceeding.");
          return;
        }
      }
      setCurrentPage(nextPage);
    } else {
      setFinished(true);
      setResult(calculateMBTI(answers));
    }
  };

  const handleShowResult = () => {
    for (
      let i = currentPage * questionsPerPage;
      i < Math.min((currentPage + 1) * questionsPerPage, questions.length);
      i++
    ) {
      if (answers[i] === null) {
        alert("Please answer all questions before seeing the result.");
        return;
      }
    }
    setFinished(true);
    setResult(calculateMBTI(answers));
  };

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage * questionsPerPage + index] = answer;
    setAnswers(updatedAnswers);
  };

  const renderQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(
      (currentPage + 1) * questionsPerPage,
      questions.length
    );
    return questions.slice(startIndex, endIndex).map((question, index) => (
      <div key={startIndex + index} className="question-block">
        <div className="question">{question}</div>
        <div className="answer-container">
          <label>
            <input
              type="radio"
              name={`answer-${startIndex + index}`}
              value="Yes"
              checked={
                answers[currentPage * questionsPerPage + index] === "Yes"
              }
              onChange={() => handleAnswer(index, "Yes")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name={`answer-${startIndex + index}`}
              value="No"
              checked={answers[currentPage * questionsPerPage + index] === "No"}
              onChange={() => handleAnswer(index, "No")}
            />
            No
          </label>
        </div>
      </div>
    ));
  };

  return (
    <Container>
      <QuestionsContainer>
        {!isFinished ? (
          <QuestionsBlock>
            {renderQuestions()}
            {currentPage > 0 && (
              <button
                id="prev-btn"
                className="button-prev"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            {currentPage ===
            Math.ceil(questions.length / questionsPerPage) - 1 ? (
              <button
                id="next-btn"
                className="button-next"
                onClick={handleShowResult}
              >
                Show result
              </button>
            ) : (
              <button
                id="next-btn"
                className="button-next"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            <div id="progress-bar">
              {`Progress: ${currentPage + 1}/${Math.ceil(
                questions.length / questionsPerPage
              )}`}
            </div>
          </QuestionsBlock>
        ) : (
          <ResultBlock>
            <div
              id="result"
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              Your MBTI type is {result}!
            </div>
            <div
              id="description"
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {result === "ISTJ" &&
                "ISTJ (Introverted, Sensing, Thinking, Judging) - ISTJs are responsible organizers, known for their practicality and attention to detail. They are focused on traditions and loyalty, and are often seen as dependable and dedicated individuals."}
              {result === "ISFJ" &&
                "ISFJ (Introverted, Sensing, Feeling, Judging) - ISFJs are warm and conscientious individuals, often placing the needs of others above their own. They are reliable, hardworking, and have a strong sense of duty."}
              {result === "INFJ" &&
                "INFJ (Introverted, Intuitive, Feeling, Judging) - INFJs are compassionate and insightful, often driven by their desire to help others and make a positive impact on the world. They are creative, idealistic, and value deep, meaningful connections."}
              {result === "INTJ" &&
                "INTJs are analytical and innovative thinkers, known for their strategic approach to problem-solving. They are independent, determined, and have a strong drive to achieve their goals."}
              {result === "ISTP" &&
                "ISTP (Introverted, Sensing, Thinking, Perceiving) - ISTPs are practical and adaptable, often drawn to hands-on activities and a desire for freedom. They are logical, resourceful, and enjoy exploring new experiences."}
              {result === "ISFP" &&
                "ISFP (Introverted, Sensing, Feeling, Perceiving) - ISFPs are gentle and sensitive individuals, often expressing themselves through artistic and creative pursuits. They are empathetic, adaptable, and value harmony and personal growth."}
              {result === "INFP" &&
                "INFP (Introverted, Intuitive, Feeling, Perceiving) - INFPs are idealistic and compassionate, driven by their desire to find meaning and authenticity in life. They are creative, empathetic, and value personal integrity and individuality."}
              {result === "INTP" &&
                "INTP (Introverted, Intuitive, Thinking, Perceiving) - INTPs are logical and curious thinkers, known for their love of exploration and analysis. They are independent, inventive, and enjoy delving into complex ideas and theories."}
              {result === "ESTP" &&
                "ESTP (Extraverted, Sensing, Thinking, Perceiving) - ESTPs are energetic and action-oriented individuals, often seeking excitement and new experiences. They are adaptable, pragmatic, and enjoy living in the present moment."}
              {result === "ESFP" &&
                "ESFP (Extraverted, Sensing, Feeling, Perceiving) - ESFPs are spontaneous and fun-loving, often bringing joy and enthusiasm to those around them. They are sociable, supportive, and value living life to the fullest."}
              {result === "ENFP" &&
                "ENFP (Extraverted, Intuitive, Feeling, Perceiving) - ENFPs are imaginative and empathetic, driven by their passion for exploring new possibilities and connecting with others. They are enthusiastic, creative, and value authenticity and personal growth."}
              {result === "ENTP" &&
                "ENTP (Extraverted, Intuitive, Thinking, Perceiving) - ENTPs are innovative and resourceful thinkers, often drawn to intellectual challenges and debate. They are independent, curious, and enjoy exploring new ideas and opportunities."}
              {result === "ESTJ" &&
                "ESTJ (Extraverted, Sensing, Thinking, Judging) - ESTJs are practical and decisive individuals, often taking charge and organizing others to achieve their goals. They are responsible, direct, and value efficiency and productivity."}
              {result === "ESFJ" &&
                "ESFJ (Extraverted, Sensing, Feeling, Judging) - ESFJs are warm and caring, often taking on the role of nurturer and supporter within their communities. They are sociable, conscientious, and value harmony and cooperation.."}
              {result === "ENFJ" &&
                "ENFJ (Extraverted, Intuitive, Feeling, Judging) - ENFJs are charismatic and compassionate, often inspiring and guiding others toward personal growth and positive change. They are empathetic, diplomatic, and value meaningful connections and teamwork."}
              {result === "ENTJ" &&
                "ENTJ (Extraverted, Intuitive, Thinking, Judging) - ENTJs are strategic and assertive leaders, known for their ability to take charge and implement long-term plans. They are decisive, ambitious, and value competence and achievement."}
            </div>
            <div
              id="link"
              style={{ border: "1px solid #000", padding: "10px" }}
            >
              Want to learn more about what this means? You can consider
              visiting this source for more information:{" "}
              <a href="https://www.choosingtherapy.com/mbti-types/">
                https://www.choosingtherapy.com/mbti-types/
              </a>
            </div>
          </ResultBlock>
        )}
      </QuestionsContainer>
    </Container>
  );
};

export default QuizBlock;

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

const questions = [
  "You regularly make new friends.",
  "You prefer to do your chores before allowing yourself to relax.",
  "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
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

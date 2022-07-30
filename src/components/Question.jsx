import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScoreContext } from "../contexts/scoreContext";
import { ChosenDifficultyContext } from "../contexts/difficulty";
function Question() {
  let { category, index } = useParams();
  index = parseInt(index);
  const [score, setScore] = useContext(ScoreContext);
  const [{ chosenDifficulty }, setChosenDifficulty] = useContext(
    ChosenDifficultyContext
  );
  // Answer Period depending on the difficulty level
  const answerPeriod =
    chosenDifficulty === "easy"
      ? 90000
      : chosenDifficulty === "medium"
      ? 60000
      : chosenDifficulty === "hard" && 30000;

  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();
  // Timeout
  const start = Date.now();
  console.log("starting timer...");
  useEffect(() => {
    setTimeout(() => {
      const millis = Date.now() - start;
      console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
      handleSkip();
      index > 8
        ? navigate("/categroties")
        : navigate(`/question/${category}/${index + 1}`);
    }, answerPeriod);
  });

  // Fetch Question from API
  const { isLoading, error, data, status } = useQuery(["data"], () =>
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
    ).then((res) => res.json())
  );
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const question = data?.results?.[index];
  // Shuffle the answers
  const answers =
    question &&
    [...question?.incorrect_answers, question?.correct_answer]?.sort(
      (a, b) => 0.5 - Math.random()
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAnswer === question?.correct_answer) {
      const newScore = {
        ...score,
        questions: score.questions + 1,
        correct: score.correct + 1,
      };
      setScore(newScore);
    } else {
      const newScore = {
        ...score,
        questions: score.questions + 1,
        failed: score.failed + 1,
      };
      setScore(newScore);
    }
  };
  const handleSkip = () => {
    const newScore = {
      ...score,
      questions: score.questions + 1,
      skiped: score.skiped + 1,
    };
    setScore(newScore);
  };

  return (
    <div>
      <h1>Question</h1>
      <p>{question?.question}</p>
      <ul>
        {answers
          ? answers?.map((a, i) => (
              <button
                key={i}
                onClick={(e) => setUserAnswer(e.target.innerText)}
              >
                {a}
              </button>
            ))
          : "Loading..."}
      </ul>
      <p>
        {question?.correct_answer} : {userAnswer}
      </p>
      <div className="btns">
        <button onClick={handleSubmit}>
          {index > 8 ? (
            <Link to="/categroties">Back to Category</Link>
          ) : (
            <Link to={`/question/${category}/${index + 1}`}>Next</Link>
          )}
        </button>
        <button onClick={handleSkip}>
          {index > 8 ? (
            <Link to="/categroties">Back to Category</Link>
          ) : (
            <Link to={`/question/${category}/${index + 1}`}>Skiped</Link>
          )}
        </button>
      </div>
      <div>
        <p>length: {data?.results?.length}</p>
        <p>index: {index}</p>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}

export default Question;

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScoreContext } from "../contexts/scoreContext";
function Question() {
  let { category, index } = useParams();
  index = parseInt(index);
  const [score, setScore] = useContext(ScoreContext);
  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();
  const start = Date.now();
  console.log("starting timer...");

  const fetchQuestions = async () =>
    await (
      await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
      )
    ).json();

  const { isLoading, error, data, status } = useQuery(["data"], fetchQuestions);
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const question = data?.results?.[index];
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

  useEffect(() => {
    setTimeout(() => {
      const millis = Date.now() - start;
      console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);

      index > 8
        ? navigate("/categroties")
        : navigate(`/question/${category}/${index + 1}`);
    }, 2000);
  });

  return (
    <div>
      <h1>Question Start: </h1>
      <p>{question?.question} </p>
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

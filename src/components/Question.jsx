import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScoreContext } from "../contexts/scoreContext";
function Question() {
  let { category, index } = useParams();
  const [score, setScore] = useContext(ScoreContext);

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
  const answers = [
    ...question?.incorrect_answers,
    question?.correct_answer,
  ]?.sort((a, b) => 0.5 - Math.random());

  const handleClick = (e) => {
    if (e.target.innerText === question?.correct_answer) {
      console.log("Text " + e.target.innerText)
      const newScore = { ...score,  questions: score.questions + 1, correct: score.correct + 1};
      console.dir(newScore)
      setScore(newScore);
    }
    console.log('correct: ' + score.correct);
  };
  const handleSkip = () => {
    const newScore = { ...score, questions: score.questions + 1, skiped: score.skiped + 1 };
    setScore(newScore);
    console.log(score);
  };
  return (
    <div>
      <h1>Question</h1>
      <p>{question?.question} </p>
      <ul>{answers && answers?.map((a, i) => <button key={i} onClick={handleClick}>{a}</button>)}</ul>
      <p>{question?.correct_answer}</p>
      <div className="btns">
        <button>next</button>
        <button onClick={handleSkip}>Skiped: {score.skiped}</button>
      </div>
      <div>
        <h1>Score</h1>
        <p>questions: {score.questions}</p>
        <p>correct: {score.correct}</p>
        <p>failed: {score.failed}</p>
        <p>skiped: {score.skiped}</p>
      </div>
    </div>
  );
}

export default Question;

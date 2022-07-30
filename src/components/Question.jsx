import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScoreContext } from "../contexts/scoreContext";
function Question() {
  let { category, index } = useParams();
  const [{ score }, setScore] = useContext(ScoreContext);

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
  const answers = [...question?.incorrect_answers, question?.correct_answer]?.sort((a, b) => 0.5 - Math.random())

  const handleClick = (e) => {
    e.target.innerHTML === question?.correct_answer && score.correct++
    console.log(score.correct)
  }

  return (
    <div>
      <h1>Question</h1>
      <p>{question?.question} </p>
      <ul>
        {answers && answers?.map((a, i) => (
          <button key={i} onClick={handleClick}>
            {a}
          </button>
        ))}
      </ul>
      <p>{question?.correct_answer}</p>
      <p>questions: {score.questions}</p>
      <p>correct: {score.correct}</p>
      <p>failed: {score.failed}</p>
      <p>skiped: {score.skiped}</p>
    </div>
  );
}

export default Question;

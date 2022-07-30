import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Question() {
  let { category, index } = useParams();

  const fetchQuestions = async () =>
    await (
      await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy`
      )
    ).json();

  const { isLoading, error, data, status } = useQuery(["data"], fetchQuestions);
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const question = data?.results?.[index];
  console.log(question);

  return (
    <div>
      <h1>Question</h1>
      <p>{question.question} </p>
      <ul>{question?.incorrect_answers?.map((a, i) => <button key={i}>{a}</button>)}</ul>
    </div>
  );
}

export default Question;

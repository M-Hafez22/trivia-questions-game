import React from "react";
import { useParams } from "react-router-dom";

function Question() {
  let { category, index } = useParams();

  return (
    <div>
      <h1>Question</h1>
      <p>Category: {category} </p>
      <p>Index: {index}</p>
    </div>
  );
}

export default Question;

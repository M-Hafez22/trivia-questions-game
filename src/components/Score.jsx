import React, { useContext } from "react";
import { ScoreContext } from "../contexts/scoreContext";

function Score() {
  const [score, setScore] = useContext(ScoreContext);

  return (
    <div>
      <p>questions: {score.questions}</p>
      <p>correct: {score.correct}</p>
      <p>failed: {score.failed}</p>
      <p>skiped: {score.skiped}</p>
    </div>
  );
}

export default Score;

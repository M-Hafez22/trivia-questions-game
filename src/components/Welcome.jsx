import React, { useContext, useState } from "react";
import { UserNameContext } from "../contexts/userName";
import { ChosenDifficultyContext } from "../contexts/difficulty";

function Welcome() {
  // Get userName from User
  const [{ userName }, setUserName] = useContext(UserNameContext);
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName(value);
  };

  // Get difficulty level from User
  const [{ chosenDifficulty }, setChosenDifficulty] = useContext(
    ChosenDifficultyContext
  );
  const difficultyList = ["easy", "medium", "hard"];

  return (
    <div>
      <h1>Welcome</h1>
      {/* <p>userName: {userName}</p> */}
      <form onSubmit={handleSubmit} className="input">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          required
        />
      </form>

      {/* <h2>chosenDifficulty: {chosenDifficulty}</h2> */}
      <ul>
        {difficultyList.map((d, i) => (
          <button
            key={i}
            onClick={() => setChosenDifficulty(d)}
            style={{ color: chosenDifficulty === d ? "blue" : "red" }}
          >
            {d}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Welcome;

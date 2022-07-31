import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserNameContext } from "../contexts/userName";
import { ChosenDifficultyContext } from "../contexts/difficulty";
import { ThemeContext } from "../contexts/theme";

function Welcome() {
  const [{ isDark }] = useContext(ThemeContext);
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
      <form
        onSubmit={handleSubmit}
        className={isDark ? "input dark" : "input light"}
      >
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          required
        />
        <label
          // Show unvalid values
          style={value.length > 0 ? { top: 0 } : { top: "" }}
        >
          Player Name
        </label>
      </form>
      <ul>
        {difficultyList.map((d, i) => (
          <button
            key={i}
            onClick={() => setChosenDifficulty(d)}
            className={
              chosenDifficulty === d
                ? isDark
                  ? "level-btn dark active"
                  : "level-btn light active"
                : isDark
                ? "level-btn dark"
                : "level-btn light"
            }
          >
            {d}
          </button>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className={isDark ? "dark submit" : "light submit"}
      >
        <Link to="/categroties">Play</Link>
      </button>
    </div>
  );
}

export default Welcome;

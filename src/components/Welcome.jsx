import React, { useContext, useState } from "react";
import { UserNameContext } from "../contexts/userName";

function Welcome() {
  // Get userName from User
  const [{ userName }, setUserName] = useContext(UserNameContext);
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName(value);
  };
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
    </div>
  );
}

export default Welcome;

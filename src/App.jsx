import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "./components/Welcome";
import Categroties from "./components/Categroties";
import Question from "./components/Question";
import Score from "./components/Score";

function App() {
  return (
    <div className="App">
      <header className="App-header">Trivia Questions game</header>
      <Router>
        <div className="links">
          <Link to="/">Welcome</Link>
          <Link to="/categroties">Categroties</Link>
          <Link to="/score">score</Link>
        </div>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/categroties" element={<Categroties />} />
          <Route path="/question/:category/:index" element={<Question />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </main>
      </Router>
    </div>
  );
}

export default App;

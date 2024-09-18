import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [isAgainstAI, setIsAgainstAI] = useState(false);

  const startGame = (aiMode) => {
    setIsAgainstAI(aiMode);
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-mode">
        <button onClick={() => startGame(false)}>Play vs Player</button>
        <button onClick={() => startGame(true)}>Play vs AI</button>
      </div>
      <Board isAgainstAI={isAgainstAI} />
    </div>
  );
}

export default App;

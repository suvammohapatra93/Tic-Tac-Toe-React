import React, { useState } from "react";
import Square from "./Square";

const Board = ({ isAgainstAI }) => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const current = history[stepNumber];

  const winnerLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentState) => {
    for (let condition of winnerLogic) {
      const [a, b, c] = condition;
      if (
        currentState[a] &&
        currentState[a] === currentState[b] &&
        currentState[a] === currentState[c]
      ) {
        return currentState[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentBoard = historyCopy[stepNumber];
    if (currentBoard[index] || winner) return; // Ignore click if square is filled or there's a winner

    const copyState = [...currentBoard];
    copyState[index] = isXTurn ? "X" : "O";
    setHistory([...historyCopy, copyState]);
    setStepNumber(historyCopy.length);

    const currentWinner = checkWinner(copyState);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (!copyState.includes(null)) {
      setWinner("Draw");
    }

    setIsXTurn(!isXTurn);

    // Handle AI move if the game is not over
    if (isAgainstAI && !currentWinner && !isXTurn) {
      setTimeout(() => makeAIMove(copyState), 500); // Slight delay for AI move
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsXTurn(step % 2 === 0);
    setWinner(null); // Reset winner when jumping back
  };

  const makeAIMove = (currentBoard) => {
    let availableSquares = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (availableSquares.length === 0) return;

    let aiMove =
      availableSquares[Math.floor(Math.random() * availableSquares.length)];
    handleClick(aiMove); // AI makes its move
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="board-container">
      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Next Player: ${isXTurn ? "X" : "O"}`}
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={current[0]} />
        <Square onClick={() => handleClick(1)} value={current[1]} />
        <Square onClick={() => handleClick(2)} value={current[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={current[3]} />
        <Square onClick={() => handleClick(4)} value={current[4]} />
        <Square onClick={() => handleClick(5)} value={current[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={current[6]} />
        <Square onClick={() => handleClick(7)} value={current[7]} />
        <Square onClick={() => handleClick(8)} value={current[8]} />
      </div>
      {winner && (
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      )}

      {/* Game history section */}
      <div className="game-history">
        <h3>Game History</h3>
        <ul>
          {history.map((_step, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? `Go to move #${move}` : "Go to start"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;

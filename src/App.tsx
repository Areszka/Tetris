import "./App.css";

import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import useBoard from "./components/Board/useBoard";
import GameControls from "./components/GameControls/GameControls";

function App() {
  const { board, currentShape, gameStatus, resetGame, score, toggleGameStatus } = useBoard();

  return (
    <>
      <Header gameStatus={gameStatus} score={score} />
      <Board board={board} currentShape={currentShape} />
      <GameControls
        resetGame={resetGame}
        toggleGameStatus={toggleGameStatus}
        gameStatus={gameStatus}
      />
    </>
  );
}

export default App;

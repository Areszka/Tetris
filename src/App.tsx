import "./App.css";

import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import useBoard from "./components/Board/useBoard";

function App() {
  const { board, currentShape, gameStatus } = useBoard();

  return (
    <>
      <Header gameStatus={gameStatus} />
      <Board board={board} currentShape={currentShape} />
    </>
  );
}

export default App;

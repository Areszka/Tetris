import React from "react";
import { GameStatus } from "../Board/useBoard";

function Header({ gameStatus }: { gameStatus: GameStatus }) {
  return <h1>Game status : {gameStatus}</h1>;
}

export default React.memo(Header);

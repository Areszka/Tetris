import { FiRotateCw, FiPlay, FiPause } from "react-icons/fi";
import styles from "./GameControls.module.css";
import { GameStatus } from "../Board/useBoard";
import { IconType } from "react-icons";

function GameControls({
  resetGame,
  toggleGameStatus,
  gameStatus,
}: {
  resetGame: () => void;
  toggleGameStatus: () => void;
  gameStatus: GameStatus;
}) {
  return (
    <div className={styles.wrapper}>
      <IconButton onClick={resetGame} icon={FiRotateCw} />
      {gameStatus === "running" && <IconButton onClick={toggleGameStatus} icon={FiPause} />}
      {gameStatus === "paused" && <IconButton onClick={toggleGameStatus} icon={FiPlay} />}
    </div>
  );
}

function IconButton({ onClick, icon: Icon }: { onClick: () => void; icon: IconType }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <Icon size={32} />
    </button>
  );
}
export default GameControls;

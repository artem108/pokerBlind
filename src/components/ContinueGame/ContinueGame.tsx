import { FC } from "react";
import { ContinueGameProps } from "../../interfaces";
import "./style.scss";

const ContinueGame: FC<ContinueGameProps> = ({ setContinueGame, showModal }) => {
  return (
    <div className={`continue-game-container ${showModal ? 'show-modal' : 'hide-modal'}`}>
      <div className="continue-game-container-title">
        <h1>Continue Game?</h1>
      </div>
      <div className="continue-game-buttons">
        <button onClick={() => setContinueGame(false)}>No</button>
        <button onClick={() => setContinueGame(true)}>Yes</button>
      </div>
    </div>
  );
};

export default ContinueGame;

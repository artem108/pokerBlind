import { FC } from "react";
import Blinds from "./Blinds"
import { SettingsProps } from "../../interfaces";
import "./style.scss";

const Settings: FC<SettingsProps> = ({
  minutes,
  setMinutes,
  handleMinutesChange,
  handleAnteChange,
  setCurrentBlindsModel,
  currentBlindsModel
}) => {

  return (
    <div className="settings-container">
      <div className="input-timer">
        blinds interval -
        <input
          type="number"
          value={minutes ? minutes : ""}
          onChange={handleMinutesChange}
        />
        <p>m</p>
      </div>
      <div className="input-timer">
        ante -
        <input type="number" value={0} onChange={handleAnteChange} />
      </div>
      <Blinds setCurrentBlindsModel={setCurrentBlindsModel} currentBlindsModel={currentBlindsModel}/>
    </div>
  );
};

export default Settings;

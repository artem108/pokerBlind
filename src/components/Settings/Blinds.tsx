import { FC } from "react";
import { BlindsModel, BlinsProps } from "../../interfaces";
import { blindsModelNames, blindsStrategyExample } from "../../helpers";

const Blinds: FC<BlinsProps> = ({ setCurrentBlindsModel, currentBlindsModel }) => {
  const blinds = blindsStrategyExample[currentBlindsModel]();
  
  return (
        <div className="blinds-settings-container">
        <div className="blinds-settings-buttons">
          {
            blindsModelNames.map((name, index) => {
              return (
                <button
                  key={index}
                  className={name === currentBlindsModel ? 'selected' : ''}
                  onClick={() => setCurrentBlindsModel(name)}
                >
                  {name}
                </button>
              );
            })
          }
        </div>
        <div className="blinds-settings-table">
          {blinds.map((blind) => (
            <div className="blinds-settings-table-step">
              <div className="blinds-settings-table-step-small">
                {blind.small}
              </div>
              <div className="blinds-settings-table-step-small">
                {blind.big}
              </div>
            </div>
          ))}
        </div>
        </div>
    )

}

export default Blinds;
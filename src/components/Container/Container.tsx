import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import Navigation from "../Navigation/Navigation";
import History from "../History/History";
import { FC, useEffect, useRef, useState } from "react";
import {
  BlindsModel,
  blindsType,
  blindsStrategyType,
  TimerProps,
  Tabs,
  ContainerProps,
} from "../../interfaces";
import { blindsStrategy, startBlinds } from "../../helpers";

const Container: FC<ContainerProps> = ({ currentGame, saveGame, games }) => {
  const [minutes, setMinutes] = useState(currentGame.minutes);
  const [ante, setAnte] = useState(currentGame.ante);
  const [currentTab, setCurrentTab] = useState<Tabs>("timer");
  const [currentBlindsModel, setCurrentBlindsModel] = useState<BlindsModel>(
    currentGame.currentBlindsModel
  );
  const [blinds, setBlinds] = useState<blindsType>(currentGame.blinds);
  const [round, setRound] = useState<number>(currentGame.round);
  const blindsStrategyFormula = blindsStrategy?.[currentBlindsModel];
  const [nextBlinds, setNextBlinds] = useState<blindsType>(
    blindsStrategyFormula(startBlinds.small, startBlinds.big)
  );
  const [isRed, setIsRed] = useState(false);
  const redBlock = useRef<null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const getCurrGame = () => ({
    minutes,
    ante,
    currentBlindsModel,
    blinds,
    round,
  });

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputSeconds = parseInt(event.target.value, 10);
    const minutes = isNaN(inputSeconds) ? 0 : inputSeconds;
    setMinutes(minutes);
    saveGame({
      ...getCurrGame(),
      minutes,
    });
  };

  const handleAnteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ante = parseInt(event.target.value, 10);
    setAnte(parseInt(event.target.value, 10));
    saveGame({
      ...getCurrGame(),
      ante,
    });
  };

  const handleBlindsModelChange = (currentBlindsModel: BlindsModel) => {
    setCurrentBlindsModel(currentBlindsModel);
    saveGame({
      ...getCurrGame(),
      currentBlindsModel,
    });
  };

  const handleBlidsChange = () => {
    setBlinds((prev: blindsType) => {
      const blinds = blindsStrategyFormula(prev.small, prev.big);
      setNextBlinds(blindsStrategyFormula(blinds.small, blinds.big));

      return blinds;
    });
  };

  const handleRoundChange = () => {
    setRound((prev: number) => prev + 1);
  };

  const changeTab = (id: Tabs) => {
    setCurrentTab(id);
  };
  
  const Tabs = {
    settings: (
      <Settings
        minutes={minutes}
        handleMinutesChange={handleMinutesChange}
        handleAnteChange={handleAnteChange}
        setMinutes={setMinutes}
        setCurrentBlindsModel={handleBlindsModelChange}
        currentBlindsModel={currentBlindsModel}
      />
    ),
    timer: (
      <Timer
        minutes={minutes}
        currentBlindsModel={currentBlindsModel}
        ante={ante}
        setRound={handleRoundChange}
        setBlinds={handleBlidsChange}
        blinds={blinds}
        round={round}
        setIsRed={setIsRed}
        nextBlinds={nextBlinds}
      />
    ),
    history: <History games={games}/>,
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      saveGame(getCurrGame());
    }
  }, [blinds]);

  return (
    <div className={`container ${isRed ? "red" : ""}`} ref={redBlock as any}>
      {Tabs[currentTab as keyof typeof Tabs]}
      <Navigation changeTab={changeTab} />
    </div>
  );
};

export default Container;

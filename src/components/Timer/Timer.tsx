import React, { useState, useEffect, FC, Dispatch, SetStateAction, useRef } from "react";
import { formatTime } from "../../helpers";
import { TimerProps } from "../../interfaces";
import "./style.scss";

const Timer: FC<TimerProps> = ({ 
  minutes, 
  ante,
  blinds,
  round,
  nextBlinds,
  setRound,
  setBlinds,
  setIsRed
}) => {
  const [seconds, setSeconds] = useState<number>(minutes * 60);
  const [pause, setPause] = useState<boolean>(true);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartPause = () => {
    setPause(!pause);
  };

  const alarm = (): void => {
    setIsRed(true);
    setTimeout(() => {
      setIsRed((prev: boolean) => false);
    }, 1000)

    setTimeout(() => {
      setIsRed((prev: boolean) => true);
    }, 2000)

    setTimeout(() => {
      setIsRed((prev: boolean) => false);
    }, 3000)

    setTimeout(() => {
      setIsRed((prev: boolean) => true);
    }, 4000)

    setTimeout(() => {
      setIsRed((prev: boolean) => false);
    }, 5000)
  };

  const nextBlind = () => {
    setSeconds(minutes * 60);
    setRound();
    setBlinds();
    alarm();
  };

  const previousBlind = () => {
    setSeconds(minutes * 60);
  }

  useEffect(() => {
    let interval: any;

    if (!seconds) {
      // audioRef?.current?.play();
      nextBlind();
    }

    if (!pause && seconds) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [pause, seconds]);

  useEffect(() => {
    setSeconds(minutes * 60);
  }, [minutes]);

  return (
    <div className="input-container">
      <div className="blinds-container">
        <div>
          <p>
            <p className="blinds-icon"></p>
            <p className="current-blinds">{`${blinds.small}/${blinds.big}`}</p>
            {` > ${nextBlinds.small}/${nextBlinds.big}`}
          </p>
        </div>
      </div>
      <div className="time-container">
        <p className="">{formatTime(seconds)}</p>
      </div>
      <div className="controlls-container">
        <button className="prev-button" onClick={previousBlind}></button>
        <button
          className={`${!pause ? "pause" : "play"}-button`}
          onClick={handleStartPause}
        ></button>
        <button className="next-button" onClick={nextBlind}></button>
      </div>
      <div className="blinds-container">
        <div>
          <p>
            round: {round}
          </p>
        </div>
        <div>
          {/* <p>
            Ante: {round}
          </p> */}
        </div>
      </div>
      {/* <audio src="./../../assets/gong.mp3" ref={audioRef} crossOrigin="anonymous" autoPlay></audio> */}
    </div>
  );
};

export default Timer;

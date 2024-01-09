import { useEffect, useState } from "react";
import Container from "./components/Container/Container";
import ContinueGame from "./components/ContinueGame/ContinueGame";
import { startBlinds } from "./helpers";

const GAME_TEMPLATE = {
  minutes: 30,
  ante: 0, 
  currentBlindsModel: 'classic',
  blinds: startBlinds,
  round: 1,
  date: new Date().toISOString().slice(0, 10)
};

const App = () => {
  if (!localStorage.getItem("games")) {
    localStorage.setItem("games", JSON.stringify({games:[]}))
  }
  const {games} = JSON.parse(localStorage.getItem("games") || "");
  
  const [showModal, setShowModal] = useState<boolean>(Boolean(games.length));
  const [currentGame, setCurrentGame] = useState<{ [key: string]: any }>(GAME_TEMPLATE);

  const handleModal = (continueG: any): void => {
    if (!continueG) {
      games.push(GAME_TEMPLATE);
      localStorage.setItem("games", JSON.stringify({games}));
    } else {
      setCurrentGame(games[games.length - 1]);
    }

    setShowModal(false);
  };

  const saveGame = (game: any) => {
    const gameId = games.length === 0 ? 0 : games.length - 1;
    const newGame = {
      ...currentGame,
      ...game
    }
    games[gameId] = newGame;
    localStorage.setItem("games", JSON.stringify({games}))
    setCurrentGame(newGame);
    console.log('save game', newGame);  
  }

  return (
    <>
    {
      showModal ? 
      <ContinueGame setContinueGame={handleModal} showModal={showModal} />
      : <Container currentGame={currentGame} saveGame={saveGame} games={games}/>
    }
    </>
  );
};

export default App;

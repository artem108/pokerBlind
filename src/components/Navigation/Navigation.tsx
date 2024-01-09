import { FC } from "react";
import { NavigationProps } from "../../interfaces";
import "./style.scss";

const Navigation: FC<NavigationProps> = ({ changeTab }) => {
  return (
    <footer className="navigation-container">
      <button className="settings" onClick={() => changeTab('settings')}></button>
      <button className="timer" onClick={() => changeTab('timer')}></button>
      <button className="history" onClick={() => changeTab('history')}></button>
    </footer>
  );
};

export default Navigation;

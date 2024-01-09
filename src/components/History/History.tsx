import { FC } from "react";
import { HistoryProps } from "../../interfaces";
import "./style.scss"

const History:FC<HistoryProps> = ({ games }) => {

    const getTotalTime = (round: number, minutes: number) => {
        const hours = Math.floor((minutes * round) / 60);
        const remainingMinutes = minutes % 60;
      
        const formattedHours = hours > 0 ? `${hours}h` : '';
        const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : '';
      
        return `${formattedHours} ${formattedMinutes}`.trim();
    }
    return (
        <div className="history-container">
            <div className="history-container-column-title">
                <div className="history-container-cell-title">Date</div>
                <div className="history-container-cell-title">Time</div>
                <div className="history-container-cell-title">Blinds</div>
                
            </div>
            {
                games.map((game, index) => {
                    return (
                        <div className="history-container-column">
                            <div className="history-container-cell">{game.date}</div>
                            <div className="history-container-cell">{getTotalTime(game.round, game.minutes)}</div>
                            <div className="history-container-cell">s: {game.blinds.small} b:  {game.blinds.small}</div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default History;
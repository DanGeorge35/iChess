import React from "react";

interface PlayerInfoProps {
  isWhiteTurn: boolean;
  gameMode: "ai" | "local" | "online";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ isWhiteTurn, gameMode }) => {
  return (
    <div className="player-info">
      <div>
        {gameMode === "ai" ? (
          <span>{isWhiteTurn ? "Your turn (White)" : "AI's turn"}</span>
        ) : gameMode === "local" ? (
          <span>
            {isWhiteTurn
              ? "Player 1's turn (White)"
              : "Player 2's turn (Black)"}
          </span>
        ) : (
          <span>{isWhiteTurn ? "Your turn (White)" : "Opponent's turn"}</span>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;

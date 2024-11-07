interface GameInfoProps {
  gameOver: boolean;
  winner: "Black" | "White" | null;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameOver, winner }) => {
  if (!gameOver) return null; // Instead of returning false, return null

  return (
    <div className="game-over">
      <p>Game Over</p>
      <p>Winner: {winner}</p>
      <p>Press Enter to restart</p>
    </div>
  );
};

export default GameInfo;

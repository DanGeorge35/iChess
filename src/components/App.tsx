import "../styles/App.css";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function App() {
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState<"Black" | "White" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Let's perform a function on the game state
  function safeGameMutate(modify: any) {
    setGame((g: { fen: () => string }) => {
      const update = new Chess(); // Fresh instance
      update.load(g.fen()); // Load the FEN string
      modify(update);
      return update;
    });
  }

  // Movement of computer
  function makeRandomMove() {
    const possibleMoves = game.moves(); // Use legalMoves() instead of moves()

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game: any) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  // Perform an action when a piece is dropped by a user
  function onDrop(source: any, target: any) {
    if (gameOver) return false;

    let move = null;
    safeGameMutate((game: any) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q", // Promote to queen by default
      });
    });
    if (move === null) return false;
    setTimeout(makeRandomMove, 200); // Let the computer make a move after a short delay
    return true;
  }

  // Reset the game
  function restartGame() {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
  }

  // Listen for Enter key press to restart the game
  useEffect(() => {
    function handleKeyPress(event: any) {
      if (event.key === "Enter") {
        restartGame();
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="app">
      <div className="header">
        <img
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210420155809/gfg-new-logo.png"
          alt="Game Image"
          className="game-image"
        />
        <div className="game-info">
          <h1>GeeksforGeeks Chess Game</h1>
        </div>
      </div>
      <div className="chessboard-container">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        {gameOver && (
          <div className="game-over">
            <p>Game Over</p>
            <p>Winner: {winner}</p>
            <p>Press Enter to restart</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

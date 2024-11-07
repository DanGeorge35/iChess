import "./styles/App.css";
import { useState, useEffect } from "react";
import { Chess, ChessInstance, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

function App() {
  const [game, setGame] = useState<ChessInstance>(new Chess());
  const [winner, setWinner] = useState<"Black" | "White" | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Helper function to safely mutate the game state
  function safeGameMutate(modify: (game: ChessInstance) => void) {
    setGame((g) => {
      const update = new Chess(); // Fresh instance
      update.load(g.fen()); // Load the FEN string
      modify(update);
      return update;
    });
  }

  // Handle the random move of the computer
  function makeRandomMove() {
    const possibleMoves = game.moves(); // Get all legal moves

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  // Perform an action when a piece is dropped by the user
  function onDrop(source: Square, target: Square) {
    if (gameOver) return false;

    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q", // Default promotion to queen
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
    function handleKeyPress(event: KeyboardEvent) {
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

import { ChessInstance } from "chess.js";

export function makeRandomMove(
  game: ChessInstance,
  setGame: React.Dispatch<React.SetStateAction<ChessInstance>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setWinner: React.Dispatch<React.SetStateAction<"Black" | "White" | null>>
) {
  const possibleMoves = game.moves(); // Get all legal moves

  if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
    setGameOver(true);
    const winner = game.turn() === "w" ? "Black" : "White";
    setWinner(winner);
    return;
  }

  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  const move = possibleMoves[randomIndex];

  setGame((prevGame) => {
    prevGame.move(move);
    return prevGame;
  });
}

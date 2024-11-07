import { Chess, ChessInstance } from "chess.js";

export function restartGame(
  setGame: React.Dispatch<React.SetStateAction<ChessInstance>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setWinner: React.Dispatch<React.SetStateAction<"Black" | "White" | null>>
) {
  setGame(new Chess());
  setGameOver(false);
  setWinner(null);
}

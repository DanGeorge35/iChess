import { Chessboard } from "react-chessboard";

interface ChessBoardProps {
  position: string;
  onPieceDrop: (source: string, target: string) => boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ position, onPieceDrop }) => {
  return <Chessboard position={position} onPieceDrop={onPieceDrop} />;
};

export default ChessBoard;

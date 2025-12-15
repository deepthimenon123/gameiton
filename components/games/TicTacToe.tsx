import React, { useState } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { RotateCcw, ArrowLeft } from 'lucide-react';

export const TicTacToe: React.FC<GameComponentProps> = ({ onBack }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-4 fade-in">
      <div className="w-full flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="!px-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div className="text-xl font-bold text-slate-800">Tic Tac Toe</div>
        <Button variant="ghost" onClick={resetGame} className="!px-2">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-2xl shadow-inner">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl text-4xl font-bold flex items-center justify-center shadow-sm transition-all duration-200
              ${!cell && !winner ? 'hover:bg-slate-50' : ''}
              ${cell === 'X' ? 'text-indigo-500' : 'text-rose-500'}
            `}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center h-12">
        {winner ? (
          <div className="text-2xl font-bold text-green-600 animate-bounce">
            Player {winner} Wins!
          </div>
        ) : isDraw ? (
          <div className="text-2xl font-bold text-slate-500">It's a Draw!</div>
        ) : (
          <div className="text-lg text-slate-600">
            Current Turn: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { ArrowLeft, Play } from 'lucide-react';

const COLORS = ['red', 'green', 'blue', 'yellow'] as const;
type Color = typeof COLORS[number];

export const MemoryLights: React.FC<GameComponentProps> = ({ onBack }) => {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playingIdx, setPlayingIdx] = useState<number>(0);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeLight, setActiveLight] = useState<Color | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const addNewColor = useCallback(() => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence(prev => [...prev, randomColor]);
  }, []);

  const playSequence = useCallback(async () => {
    setIsShowingSequence(true);
    setPlayingIdx(0);
    
    // Slight delay before starting
    await new Promise(r => setTimeout(r, 500));

    for (let i = 0; i < sequence.length; i++) {
      setActiveLight(sequence[i]);
      await new Promise(r => setTimeout(r, 600)); // Light duration
      setActiveLight(null);
      await new Promise(r => setTimeout(r, 200)); // Gap between lights
    }
    
    setIsShowingSequence(false);
  }, [sequence]);

  useEffect(() => {
    if (isPlaying && sequence.length > 0 && playingIdx === 0) {
      playSequence();
    }
  }, [sequence, isPlaying, playSequence, playingIdx]);

  const startGame = () => {
    setSequence([]);
    setPlayingIdx(0);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    // Add first color
    setTimeout(() => {
      addNewColor();
    }, 100);
  };

  const handleColorClick = (color: Color) => {
    if (isShowingSequence || !isPlaying || gameOver) return;

    // Flash the clicked color briefly
    setActiveLight(color);
    setTimeout(() => setActiveLight(null), 200);

    if (color !== sequence[playingIdx]) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    if (playingIdx === sequence.length - 1) {
      // Completed current sequence
      setScore(prev => prev + 1);
      setPlayingIdx(0);
      setIsShowingSequence(true);
      setTimeout(() => {
        addNewColor();
      }, 1000);
    } else {
      setPlayingIdx(prev => prev + 1);
    }
  };

  const getColorStyles = (color: Color) => {
    const isActive = activeLight === color;
    switch (color) {
      case 'red': return isActive ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-95' : 'bg-red-200 hover:bg-red-300';
      case 'green': return isActive ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)] scale-95' : 'bg-emerald-200 hover:bg-emerald-300';
      case 'blue': return isActive ? 'bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-95' : 'bg-blue-200 hover:bg-blue-300';
      case 'yellow': return isActive ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] scale-95' : 'bg-amber-200 hover:bg-amber-300';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-4 fade-in">
      <div className="w-full flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="!px-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div className="text-xl font-bold text-slate-800">Score: {score}</div>
        <div className="w-8"></div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="absolute z-10 bg-white/90 backdrop-blur-sm inset-0 flex flex-col items-center justify-center p-8">
           <h2 className="text-3xl font-bold text-slate-800 mb-2">Memory Lights</h2>
           <p className="text-slate-500 mb-8 text-center max-w-xs">Watch the pattern of lights and repeat it.</p>
           <Button onClick={startGame} className="px-8 py-3 text-lg shadow-lg">
             <Play className="w-5 h-5 mr-2" /> Start Game
           </Button>
        </div>
      )}

      {gameOver && (
         <div className="absolute z-10 bg-white/90 backdrop-blur-sm inset-0 flex flex-col items-center justify-center p-8">
         <h2 className="text-3xl font-bold text-rose-500 mb-2">Game Over!</h2>
         <p className="text-slate-600 mb-6 text-lg">You reached level {score + 1}</p>
         <Button onClick={startGame} className="px-8 py-3 text-lg shadow-lg">
           Try Again
         </Button>
      </div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] aspect-square">
        {COLORS.map((color) => (
          <button
            key={color}
            className={`rounded-2xl transition-all duration-150 ${getColorStyles(color)}`}
            onClick={() => handleColorClick(color)}
            disabled={isShowingSequence || !isPlaying}
          />
        ))}
      </div>
      
      <div className="h-8 mt-6">
        {isShowingSequence ? (
          <span className="text-slate-500 font-medium animate-pulse">Watch...</span>
        ) : isPlaying ? (
          <span className="text-indigo-600 font-medium">Your Turn!</span>
        ) : null}
      </div>
    </div>
  );
};
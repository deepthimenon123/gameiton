import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { ArrowLeft, Play, Rat } from 'lucide-react';

export const WhackAGrid: React.FC<GameComponentProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  
  const timerRef = useRef<number | null>(null);
  const moleTimerRef = useRef<number | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    moveMole();
  };

  const endGame = () => {
    setIsPlaying(false);
    setActiveSlot(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
  };

  const moveMole = () => {
    if (!isPlaying && timeLeft <= 0) return; // double check guard

    const newSlot = Math.floor(Math.random() * 9);
    setActiveSlot(newSlot);

    // Speed increases as time decreases slightly? Let's keep it simple for now: random 500-1000ms
    const duration = Math.floor(Math.random() * 600) + 500;
    
    moleTimerRef.current = window.setTimeout(() => {
        if(isPlaying) moveMole();
    }, duration);
  };

  const handleWhack = (index: number) => {
    if (!isPlaying) return;
    
    if (index === activeSlot) {
      setScore(s => s + 1);
      setActiveSlot(null); // Hide immediately
      
      // Clear current mole timer and spawn a new one immediately for faster pace
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
      moveMole();
    } else {
        // Penalty? Maybe not for "easy to play". Just ignore.
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Initial mole movement handling when isPlaying toggles is done via startGame/endGame refs, 
  // but we need to ensure the loop stops if isPlaying becomes false from timer.
  useEffect(() => {
      if(!isPlaying && moleTimerRef.current) clearTimeout(moleTimerRef.current);
  }, [isPlaying]);


  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-4 fade-in">
       <div className="w-full flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="!px-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div className="flex space-x-6">
            <div className="font-bold text-slate-800">Score: <span className="text-indigo-600">{score}</span></div>
            <div className="font-bold text-slate-800">Time: <span className={`${timeLeft < 10 ? 'text-rose-500' : 'text-slate-600'}`}>{timeLeft}s</span></div>
        </div>
      </div>

      {!isPlaying && timeLeft === 30 && (
         <div className="absolute z-10 bg-white/90 backdrop-blur-sm inset-0 flex flex-col items-center justify-center p-8">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <Rat className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Whack-A-Grid</h2>
            <p className="text-slate-500 mb-8 text-center">Tap the blue dots before they disappear!</p>
            <Button onClick={startGame} className="px-8 py-3 text-lg shadow-lg">
                <Play className="w-5 h-5 mr-2" /> Start Game
            </Button>
         </div>
      )}

      {!isPlaying && timeLeft === 0 && (
         <div className="absolute z-10 bg-white/90 backdrop-blur-sm inset-0 flex flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Time's Up!</h2>
            <p className="text-slate-600 mb-6 text-2xl">Final Score: <span className="font-bold text-indigo-600">{score}</span></p>
            <Button onClick={startGame} className="px-8 py-3 text-lg shadow-lg">
                Play Again
            </Button>
         </div>
      )}

      <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-2xl shadow-inner w-full aspect-square max-w-[320px]">
        {Array(9).fill(null).map((_, index) => (
          <button
            key={index}
            className={`rounded-xl transition-all duration-75 relative overflow-hidden
              ${activeSlot === index 
                ? 'bg-indigo-500 scale-95 shadow-inner' 
                : 'bg-white shadow-sm hover:bg-slate-50'}
            `}
            onMouseDown={() => handleWhack(index)}
            onTouchStart={(e) => { e.preventDefault(); handleWhack(index); }} // Prevent ghost clicks
          >
              {activeSlot === index && (
                  <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                      <div className="w-3/4 h-3/4 bg-white/20 rounded-full blur-sm" />
                  </div>
              )}
          </button>
        ))}
      </div>
    </div>
  );
};
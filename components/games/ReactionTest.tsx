import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { ArrowLeft, Timer, Zap } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'finished' | 'early';

export const ReactionTest: React.FC<GameComponentProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [result, setResult] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const startGame = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent bubbling to container
    setGameState('waiting');
    setResult(null);
    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

    timeoutRef.current = window.setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleAreaClick = () => {
    if (gameState === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('early');
      return;
    }

    if (gameState === 'ready') {
      const endTime = Date.now();
      const reactionTime = endTime - startTimeRef.current;
      setResult(reactionTime);
      setGameState('finished');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  let content;
  let bgClass = "bg-slate-100";

  if (gameState === 'idle') {
    content = (
      <div className="text-center">
        <Zap className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Reaction Time</h3>
        <p className="text-slate-500 mb-6">Click as fast as you can when the color turns green.</p>
        <Button onClick={startGame} className="px-8 py-3 text-lg">Start</Button>
      </div>
    );
  } else if (gameState === 'waiting') {
    bgClass = "bg-rose-100 cursor-pointer";
    content = (
      <div className="text-center">
        <h3 className="text-3xl font-bold text-rose-600">Wait for Green...</h3>
      </div>
    );
  } else if (gameState === 'ready') {
    bgClass = "bg-emerald-400 cursor-pointer";
    content = (
      <div className="text-center">
        <h3 className="text-4xl font-black text-white uppercase">Click Now!</h3>
      </div>
    );
  } else if (gameState === 'finished') {
    content = (
      <div className="text-center">
        <Timer className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
        <h3 className="text-3xl font-bold text-slate-800 mb-2">{result} ms</h3>
        <p className="text-slate-500 mb-6">Great reaction!</p>
        <Button onClick={startGame} className="px-8 py-3 text-lg">Try Again</Button>
      </div>
    );
  } else if (gameState === 'early') {
    bgClass = "bg-slate-100";
    content = (
      <div className="text-center">
        <h3 className="text-2xl font-bold text-rose-600 mb-2">Too Early!</h3>
        <p className="text-slate-500 mb-6">Wait for the green color.</p>
        <Button onClick={startGame} className="px-8 py-3 text-lg">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full absolute inset-0 bg-white">
      <div className="absolute top-4 left-4 z-10">
        <Button variant="secondary" onClick={onBack} className="!px-3 bg-white/80 backdrop-blur">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
      </div>
      
      <div 
        className={`flex-1 flex items-center justify-center transition-colors duration-200 select-none ${bgClass}`}
        onMouseDown={handleAreaClick}
        onTouchStart={handleAreaClick}
      >
        <div className="p-6">
          {content}
        </div>
      </div>
    </div>
  );
};
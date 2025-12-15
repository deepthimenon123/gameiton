import React, { useState } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { ArrowLeft, Hand, Scissors, Square, Trophy, RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw' | null;
type MatchResult = 'victory' | 'defeat' | null;

export const RockPaperScissors: React.FC<GameComponentProps> = ({ onBack }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Score State
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [matchResult, setMatchResult] = useState<MatchResult>(null);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getIcon = (choice: Choice | null, className: string = "w-12 h-12") => {
    switch (choice) {
      case 'rock': return <Square className={`${className} rotate-45 rounded-sm`} />; // Visual approximation
      case 'paper': return <Hand className={className} />;
      case 'scissors': return <Scissors className={className} />;
      default: return <div className={className} />;
    }
  };

  const play = (choice: Choice) => {
    if (matchResult) return;
    
    setIsAnimating(true);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);

    // Simple animation delay
    setTimeout(() => {
        const compChoice = choices[Math.floor(Math.random() * 3)];
        setPlayerChoice(choice);
        setComputerChoice(compChoice);
        
        let roundResult: Result = 'draw';
        
        if (choice === compChoice) {
            roundResult = 'draw';
        } else if (
            (choice === 'rock' && compChoice === 'scissors') ||
            (choice === 'paper' && compChoice === 'rock') ||
            (choice === 'scissors' && compChoice === 'paper')
        ) {
            roundResult = 'win';
        } else {
            roundResult = 'lose';
        }

        setResult(roundResult);
        
        // Update scores
        if (roundResult === 'win') {
            const newScore = playerScore + 1;
            setPlayerScore(newScore);
            if (newScore >= 3) {
                setMatchResult('victory');
            }
        } else if (roundResult === 'lose') {
            const newScore = cpuScore + 1;
            setCpuScore(newScore);
            if (newScore >= 3) {
                setMatchResult('defeat');
            }
        }
        
        setIsAnimating(false);
    }, 600);
  };

  const resetMatch = () => {
    setPlayerScore(0);
    setCpuScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setMatchResult(null);
  };

  const choiceBtnClass = "flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-4 fade-in">
       <div className="w-full flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="!px-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
        <div className="flex items-center space-x-4 bg-slate-100 px-4 py-2 rounded-lg">
            <span className={`font-bold ${playerScore > cpuScore ? 'text-indigo-600' : 'text-slate-600'}`}>You: {playerScore}</span>
            <span className="text-slate-300">|</span>
            <span className={`font-bold ${cpuScore > playerScore ? 'text-rose-600' : 'text-slate-600'}`}>CPU: {cpuScore}</span>
        </div>
        <Button variant="ghost" onClick={resetMatch} className="!px-2">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Match Result Overlay */}
      {matchResult && !isAnimating && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 fade-in">
            <Trophy className={`w-20 h-20 mb-6 ${matchResult === 'victory' ? 'text-yellow-500' : 'text-slate-400'}`} />
            <h2 className="text-4xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                {matchResult === 'victory' ? 'Victory!' : 'Defeat'}
            </h2>
            <p className="text-slate-500 mb-8 text-xl">
                {matchResult === 'victory' ? 'You won the match!' : 'Better luck next time.'}
            </p>
            <div className="text-3xl font-bold mb-8 text-slate-800">
                {playerScore} - {cpuScore}
            </div>
            <Button onClick={resetMatch} className="px-8 py-3 text-lg shadow-lg" fullWidth>
                Play Again
            </Button>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">First to 3 Wins</h3>
      </div>

      <div className="flex justify-between w-full max-w-[300px] mb-12 h-32 items-end">
          <div className="flex flex-col items-center">
              <div className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''} ${result === 'win' ? 'text-green-600 scale-110 drop-shadow-lg' : 'text-slate-800'}`}>
                  {playerChoice ? getIcon(playerChoice, "w-16 h-16") : <div className="w-16 h-16 bg-slate-100 rounded-full animate-pulse" />}
              </div>
              <span className="text-sm font-medium text-slate-400 mt-2">You</span>
          </div>
          
          <div className="text-2xl font-bold text-slate-300 mb-8">VS</div>

          <div className="flex flex-col items-center">
              <div className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''} ${result === 'lose' ? 'text-green-600 scale-110 drop-shadow-lg' : 'text-slate-800'}`}>
                   {computerChoice ? getIcon(computerChoice, "w-16 h-16") : <div className="w-16 h-16 bg-slate-100 rounded-full animate-pulse" />}
              </div>
               <span className="text-sm font-medium text-slate-400 mt-2">CPU</span>
          </div>
      </div>

      <div className="h-16 mb-8 flex items-center justify-center">
          {isAnimating && <span className="text-xl font-bold text-slate-400">Fighting...</span>}
          {!isAnimating && result && (
              <span className={`text-3xl font-black uppercase tracking-wider
                ${result === 'win' ? 'text-green-500' : result === 'lose' ? 'text-rose-500' : 'text-amber-500'}
              `}>
                  {result === 'draw' ? 'Draw!' : `You ${result}!`}
              </span>
          )}
          {!isAnimating && !result && <span className="text-slate-400">Make your move</span>}
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
          <button className={choiceBtnClass} onClick={() => play('rock')} disabled={isAnimating}>
               {getIcon('rock', 'w-8 h-8 mb-2 text-slate-700')}
               <span className="text-xs font-bold uppercase text-slate-500">Rock</span>
          </button>
          <button className={choiceBtnClass} onClick={() => play('paper')} disabled={isAnimating}>
               {getIcon('paper', 'w-8 h-8 mb-2 text-slate-700')}
               <span className="text-xs font-bold uppercase text-slate-500">Paper</span>
          </button>
          <button className={choiceBtnClass} onClick={() => play('scissors')} disabled={isAnimating}>
               {getIcon('scissors', 'w-8 h-8 mb-2 text-slate-700')}
               <span className="text-xs font-bold uppercase text-slate-500">Scissors</span>
          </button>
      </div>
    </div>
  );
};
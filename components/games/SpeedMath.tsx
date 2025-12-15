import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../Button';
import { GameComponentProps } from '../../types';
import { ArrowLeft, Calculator, Play } from 'lucide-react';

interface Question {
  text: string;
  answer: number;
  options: number[];
}

export const SpeedMath: React.FC<GameComponentProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const timerRef = useRef<number | null>(null);

  const generateQuestion = useCallback((): Question => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * (score > 10 ? 3 : 2))]; // Introduce multiplication later
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    
    // Simplifications for speed
    if (op === '-') {
        if (a < b) [a, b] = [b, a]; // No negatives
    }
    if (op === '*') {
        a = Math.floor(Math.random() * 6) + 1; // Smaller numbers for multiply
        b = Math.floor(Math.random() * 6) + 1;
    }

    let ans = 0;
    if (op === '+') ans = a + b;
    else if (op === '-') ans = a - b;
    else if (op === '*') ans = a * b;

    // Generate unique options
    const opts = new Set<number>();
    opts.add(ans);
    while (opts.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const fake = ans + offset;
        if (fake >= 0 && fake !== ans) opts.add(fake);
    }

    // Shuffle
    return {
        text: `${a} ${op} ${b}`,
        answer: ans,
        options: Array.from(opts).sort(() => Math.random() - 0.5)
    };
  }, [score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setQuestion(generateQuestion());
    setFeedback(null);
  };

  const handleAnswer = (ans: number) => {
    if (!question || !isPlaying) return;

    if (ans === question.answer) {
        setScore(s => s + 1);
        setFeedback('correct');
        // Immediate next question
        setTimeout(() => {
            setFeedback(null);
            setQuestion(generateQuestion());
        }, 150);
    } else {
        // Penalty?
        setFeedback('wrong');
        setTimeout(() => setFeedback(null), 300);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
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
                <Calculator className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Speed Math</h2>
            <p className="text-slate-500 mb-8 text-center">Solve as many problems as you can in 30 seconds.</p>
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

      <div className={`w-full bg-white rounded-2xl p-8 mb-8 shadow-sm border border-slate-100 flex items-center justify-center transition-colors duration-200
        ${feedback === 'wrong' ? 'bg-rose-50 border-rose-200' : ''}
        ${feedback === 'correct' ? 'bg-green-50 border-green-200' : ''}
      `}>
          <div className="text-5xl font-bold text-slate-800 tracking-wider">
            {question ? question.text : "..."}
          </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
          {question?.options.map((opt, i) => (
              <button 
                key={i} 
                className="h-20 bg-white border-2 border-slate-200 rounded-xl text-2xl font-bold text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95 transition-all shadow-sm"
                onClick={() => handleAnswer(opt)}
                disabled={!isPlaying}
              >
                  {opt}
              </button>
          ))}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { GameId, GameDefinition } from './types';
import { GameCard } from './components/GameCard';
import { TicTacToe } from './components/games/TicTacToe';
import { ReactionTest } from './components/games/ReactionTest';
import { MemoryLights } from './components/games/MemoryLights';
import { WhackAGrid } from './components/games/WhackAGrid';
import { RockPaperScissors } from './components/games/RockPaperScissors';
import { SpeedMath } from './components/games/SpeedMath';
import { 
  Gamepad2, 
  Zap, 
  Lightbulb, 
  MousePointer2, 
  Scissors, 
  Calculator 
} from 'lucide-react';

const GAMES: GameDefinition[] = [
  {
    id: GameId.TIC_TAC_TOE,
    title: 'Tic Tac Toe',
    description: 'The classic game of X and O. Strategy in its purest form.',
    icon: Gamepad2,
    color: 'bg-rose-500',
  },
  {
    id: GameId.REACTION_TEST,
    title: 'Reaction Test',
    description: 'Wait for the green light. Blink and you miss it.',
    icon: Zap,
    color: 'bg-amber-500',
  },
  {
    id: GameId.MEMORY_LIGHTS,
    title: 'Memory Lights',
    description: 'Follow the pattern. How far can you go?',
    icon: Lightbulb,
    color: 'bg-emerald-500',
  },
  {
    id: GameId.WHACK_A_GRID,
    title: 'Whack-A-Grid',
    description: 'High speed chase. Catch the blue dots.',
    icon: MousePointer2,
    color: 'bg-blue-500',
  },
  {
    id: GameId.ROCK_PAPER_SCISSORS,
    title: 'R-P-S',
    description: 'The ultimate decision maker. You vs CPU.',
    icon: Scissors,
    color: 'bg-violet-500',
  },
  {
    id: GameId.SPEED_MATH,
    title: 'Speed Math',
    description: 'Quick calculations. Keep your brain sharp.',
    icon: Calculator,
    color: 'bg-cyan-500',
  },
];

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const renderGame = () => {
    const commonProps = { onBack: () => setActiveGame(null) };
    
    switch (activeGame) {
      case GameId.TIC_TAC_TOE: return <TicTacToe {...commonProps} />;
      case GameId.REACTION_TEST: return <ReactionTest {...commonProps} />;
      case GameId.MEMORY_LIGHTS: return <MemoryLights {...commonProps} />;
      case GameId.WHACK_A_GRID: return <WhackAGrid {...commonProps} />;
      case GameId.ROCK_PAPER_SCISSORS: return <RockPaperScissors {...commonProps} />;
      case GameId.SPEED_MATH: return <SpeedMath {...commonProps} />;
      default: return null;
    }
  };

  return (
    // The outer div handles the dark theme for the menu.
    <div className="min-h-screen font-sans bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {activeGame ? (
        // When a game is active, we force a light background because the games were designed for light mode.
        <main className="w-full h-screen overflow-hidden relative bg-slate-50 text-slate-900">
          {renderGame()}
        </main>
      ) : (
        <div className="relative min-h-screen overflow-hidden">
           {/* Background decorative elements */}
           <div className="blob w-96 h-96 bg-indigo-600 top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply opacity-50 blur-[128px]"></div>
           <div className="blob w-96 h-96 bg-purple-600 bottom-0 right-0 translate-x-1/3 translate-y-1/3 rounded-full mix-blend-multiply opacity-50 blur-[128px]"></div>
           <div className="blob w-80 h-80 bg-rose-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-overlay opacity-30 blur-[100px]"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-20 fade-in">
            <header className="mb-20 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-white/10 pb-12">
              <div className="max-w-2xl">
                <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                  MicroArcade
                </h1>
                <p className="text-2xl sm:text-3xl text-slate-300 font-medium leading-tight mb-4">
                  Just for you. Just for now.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  These games are not for competition. One time playing, and that's it. 
                  Literally nothing else. No scores maintained. No pressure. 
                  Just 30 seconds of flow.
                </p>
              </div>
              
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Current Mood</div>
                <div className="text-white font-medium flex items-center justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Ready to Play
                </div>
              </div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {GAMES.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={(g) => setActiveGame(g.id)} 
                />
              ))}
            </div>

            <footer className="mt-24 text-center border-t border-white/5 pt-12">
              <p className="text-slate-600 text-sm">
                No data is saved. Refresh to reset everything. Enjoy the moment.
              </p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
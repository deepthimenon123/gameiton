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
    description: 'Classic Strategy.',
    icon: Gamepad2,
    color: 'bg-rose-500',
  },
  {
    id: GameId.REACTION_TEST,
    title: 'Reaction',
    description: 'Test your reflexes.',
    icon: Zap,
    color: 'bg-amber-500',
  },
  {
    id: GameId.MEMORY_LIGHTS,
    title: 'Memory',
    description: 'Follow the pattern.',
    icon: Lightbulb,
    color: 'bg-emerald-500',
  },
  {
    id: GameId.WHACK_A_GRID,
    title: 'Whack-A-Grid',
    description: 'Catch the blue dots.',
    icon: MousePointer2,
    color: 'bg-blue-500',
  },
  {
    id: GameId.ROCK_PAPER_SCISSORS,
    title: 'R-P-S',
    description: 'Man vs Machine.',
    icon: Scissors,
    color: 'bg-violet-500',
  },
  {
    id: GameId.SPEED_MATH,
    title: 'Speed Math',
    description: 'Solve fast.',
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
    <div className="min-h-screen font-sans bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {activeGame ? (
        <main className="w-full h-screen overflow-hidden relative bg-slate-50 text-slate-900">
          {renderGame()}
        </main>
      ) : (
        <div className="relative min-h-screen overflow-x-hidden">
           {/* Technical Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#3b0764,transparent)] opacity-40"></div>

           {/* Top Right Status Indicator */}
           <div className="absolute top-6 right-6 z-20 flex flex-col items-end fade-in">
             <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Status</div>
             <div className="bg-slate-900 border-2 border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
               </span>
               <span className="text-slate-200 font-bold text-sm tracking-wide uppercase">Ready to Play</span>
             </div>
           </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-20 fade-in">
            <header className="mb-20 text-center relative">
              <div className="inline-block relative">
                 {/* Decorative background shape for title */}
                 <div className="absolute -inset-4 bg-indigo-600/20 transform -skew-x-12 rounded-lg blur-xl"></div>
                 <h1 className="relative text-7xl sm:text-8xl font-black tracking-tighter text-white mb-2 drop-shadow-[4px_4px_0_rgba(79,70,229,1)]">
                  GAME IT ON
                </h1>
              </div>
              
              <div className="mt-8 flex justify-center">
                 <p className="bg-slate-900/80 border border-slate-700 backdrop-blur-md text-slate-300 px-6 py-2 rounded-full font-medium text-sm sm:text-base max-w-lg leading-relaxed">
                   Just for you. Just for now. 30 seconds of flow.
                 </p>
              </div>
            </header>
            
            {/* The Game Board Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-0 pb-20">
              {GAMES.map((game) => (
                <div key={game.id} className="flex justify-center">
                    <GameCard 
                      game={game} 
                      onClick={(g) => setActiveGame(g.id)} 
                    />
                </div>
              ))}
            </div>

            <footer className="text-center pb-12 border-t border-slate-800/50 pt-8">
              <p className="text-slate-600 text-xs uppercase tracking-widest font-bold">
                No data saved • Press play • Reset anytime
              </p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
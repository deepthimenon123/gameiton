import React from 'react';
import { GameDefinition } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: GameDefinition;
  onClick: (game: GameDefinition) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const Icon = game.icon;
  
  // Extract color for the hover accent (e.g. "bg-rose-500" -> "rose-500")
  // We'll use the tailwind class directly for text/bg application
  const accentColorClass = game.color.replace('bg-', 'text-');
  const accentBgClass = game.color;

  return (
    <button 
      onClick={() => onClick(game)}
      className="group relative flex flex-col w-full h-64 bg-white rounded-xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[12px_12px_0px_0px_#4f46e5] hover:-translate-y-1 transition-all duration-200 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] overflow-hidden"
    >
      {/* Domino Top Half: Icon Area */}
      <div className="flex-1 w-full flex items-center justify-center bg-slate-50 relative overflow-hidden border-b-4 border-slate-900 group-hover:bg-slate-100 transition-colors">
        {/* Background Pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
        
        <div className={`transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${accentColorClass}`}>
          <Icon className="w-20 h-20 stroke-[1.5]" />
        </div>
      </div>

      {/* Domino Bottom Half: Info Area */}
      <div className="h-24 w-full bg-white flex flex-row items-center justify-between px-6 relative z-10">
         <div className="flex flex-col items-start text-left">
            <h3 className="text-xl font-black text-slate-900 uppercase leading-none tracking-tight">
              {game.title}
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
              {game.description.split('.')[0]}
            </p>
         </div>

         {/* Play Button Arrow */}
         <div className={`w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center ${accentBgClass} text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-4 group-hover:translate-x-0`}>
            <Play className="w-5 h-5 fill-current" />
         </div>
      </div>
    </button>
  );
};
import React from 'react';
import { GameDefinition } from '../types';

interface GameCardProps {
  game: GameDefinition;
  onClick: (game: GameDefinition) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const Icon = game.icon;
  
  // Extract color name for gradient logic (e.g. "bg-rose-500" -> "rose-500")
  const colorName = game.color.replace('bg-', '');
  
  return (
    <button 
      onClick={() => onClick(game)}
      className="group relative flex flex-col items-center p-8 rounded-3xl transition-all duration-500 w-full h-full overflow-hidden hover:-translate-y-2 hover:shadow-2xl border border-white/5 hover:border-white/10"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-colors duration-500 group-hover:bg-slate-800/60 z-0"></div>
      
      {/* Color Gradient Overlay (subtle) */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-${colorName} to-transparent z-0`}></div>

      {/* Watermark Icon (Background) */}
      <div className="absolute -right-8 -bottom-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 z-0">
        <Icon className="w-56 h-56 text-white" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <div className={`inline-flex p-4 rounded-2xl ${game.color} text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-1 ring-white/10`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
          {game.title}
        </h3>
        
        <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors max-w-xs mx-auto">
          {game.description}
        </p>

        <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white">Click to Start</span>
        </div>
      </div>
    </button>
  );
};
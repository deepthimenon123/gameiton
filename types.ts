import React from 'react';

export enum GameId {
  TIC_TAC_TOE = 'tic-tac-toe',
  REACTION_TEST = 'reaction-test',
  MEMORY_LIGHTS = 'memory-lights',
  WHACK_A_GRID = 'whack-a-grid',
  ROCK_PAPER_SCISSORS = 'rock-paper-scissors',
  SPEED_MATH = 'speed-math',
}

export interface GameDefinition {
  id: GameId;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface GameComponentProps {
  onBack: () => void;
}
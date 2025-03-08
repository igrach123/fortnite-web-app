import React from 'react';
import { Player } from '../types';

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  const calculateScore = (player: Player) => {
    let score = (player.kills * 30) + (100 - player.placement);
    if (player.placement === 1) {
      score += 100;
    } else if (player.placement === 2) {
      score += 50;
    } else if (player.placement === 3) {
      score += 25;
    }
    return score;
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const scoreA = calculateScore(a);
    const scoreB = calculateScore(b);
    return scoreB - scoreA;
  });

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ol className="list-decimal pl-5">
        {sortedPlayers.map((player) => (
          <li key={player.id} className="mb-2">
            {player.name} - Score: {calculateScore(player)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;

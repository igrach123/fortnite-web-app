import React from 'react';
import { Player } from '../types';
import { Trash2, Edit } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  deletePlayer: (id: number) => void;
  editPlayer: (id: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, deletePlayer, editPlayer }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Kills</th>
            <th className="py-2 px-4 border-b">Placement</th>
            <th className="py-2 px-4 border-b">Score</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{player.name}</td>
              <td className="py-2 px-4 border-b">{player.kills}</td>
              <td className="py-2 px-4 border-b">{player.placement}</td>
              <td className="py-2 px-4 border-b">{(player.kills * 30) + (100 - player.placement)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => editPlayer(player.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                >
                  <Edit className="inline-block mr-2" size={20} />
                  Edit
                </button>
                <button
                  onClick={() => deletePlayer(player.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <Trash2 className="inline-block mr-2" size={20} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;

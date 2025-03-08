import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface PlayerFormProps {
  addPlayer: (player: Player) => void;
  editingPlayer?: Player;
  updatePlayer: (player: Player) => void;
  setEditingPlayerId: (id: number | null) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ addPlayer, editingPlayer, updatePlayer, setEditingPlayerId }) => {
  const [name, setName] = useState('');
  const [kills, setKills] = useState(0);
  const [placement, setPlacement] = useState(1);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (editingPlayer) {
      setName(editingPlayer.name);
      setKills(editingPlayer.kills);
      setPlacement(editingPlayer.placement);
      setId(editingPlayer.id);
    } else {
      setName('');
      setKills(0);
      setPlacement(1);
      setId(0);
    }
  }, [editingPlayer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPlayer) {
      updatePlayer({ id, name, kills, placement });
      setEditingPlayerId(null);
    } else {
      const newPlayer: Player = {
        id: Date.now(),
        name,
        kills,
        placement,
      };
      addPlayer(newPlayer);
    }

    setName('');
    setKills(0);
    setPlacement(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="kills" className="block text-gray-700 text-sm font-bold mb-2">
          Kills:
        </label>
        <input
          type="number"
          id="kills"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={kills}
          onChange={(e) => setKills(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="placement" className="block text-gray-700 text-sm font-bold mb-2">
          Placement:
        </label>
        <input
          type="number"
          id="placement"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={placement}
          onChange={(e) => setPlacement(parseInt(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {editingPlayer ? 'Update Player' : 'Add Player'}
      </button>
      {editingPlayer && (
        <button
          type="button"
          onClick={() => setEditingPlayerId(null)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default PlayerForm;

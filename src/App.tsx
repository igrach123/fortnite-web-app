import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Player } from './types';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import Leaderboard from './components/Leaderboard';
import { Trophy } from 'lucide-react';

function App() {
  const [players, setPlayers] = useLocalStorage<Player[]>('players', []);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const editingPlayer = players.find((player) => player.id === editingPlayerId);

  useEffect(() => {
    // Initial players if local storage is empty
    if (players.length === 0) {
      setPlayers([
        { id: 1, name: 'Player 1', kills: 5, placement: 10 },
        { id: 2, name: 'Player 2', kills: 3, placement: 5 },
      ]);
    }
  }, [setPlayers, players]);

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const deletePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const editPlayer = (id: number) => {
    setEditingPlayerId(id);
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(
      players.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player))
    );
    setEditingPlayerId(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center text-xl font-bold">
              <Trophy className="h-6 w-6 mr-2" aria-hidden="true" />
              Fortnite Tournament
            </Link>
            <nav>
              <Link to="/players" className="text-white hover:text-gray-200 mr-4">
                Manage Players
              </Link>
              <Link to="/" className="text-white hover:text-gray-200">
                Leaderboard
              </Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={<Leaderboard players={players} />}
            />
            <Route
              path="/players"
              element={
                <div>
                  <PlayerForm
                    addPlayer={addPlayer}
                    editingPlayer={editingPlayer}
                    updatePlayer={updatePlayer}
                    setEditingPlayerId={setEditingPlayerId}
                    editingPlayer={editingPlayer}
                  />
                  <PlayerList
                    players={players}
                    deletePlayer={deletePlayer}
                    editPlayer={editPlayer}
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

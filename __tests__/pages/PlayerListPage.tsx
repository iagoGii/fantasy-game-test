import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamProvider } from '../../context/TeamContext';
import { Player } from '../../types/player';
import useSWR from 'swr';
import { mockPlayers } from '../mocks/playerMocks';


interface PlayerListPageProps {
  onBuyPlayer: (player: Player) => void;
  budget: number;
}

const PlayerListPage: React.FC<PlayerListPageProps> = ({ onBuyPlayer, budget }) => {
  const testIds = {
    playerCard: 'player-card',
    playerName: 'player-name',
    playerPosition: 'player-position',
    playerTeam: 'player-team',
    playerPoints: 'player-points',
    playerPrice: 'player-price',
    buyButton: 'buy-button',
    budgetDisplay: 'budget-display',
    errorMessage: 'error-message',
    emptyMessage: 'empty-message',
  };

  const { data: players, error } = useSWR('/api/players', () => mockPlayers);

  if (error) {
    return <div data-testid={testIds.errorMessage}>Erro ao carregar jogadores</div>;
  }

  if (!players || players.length === 0) {
    return <div data-testid={testIds.emptyMessage}>Nenhum jogador disponível</div>;
  }

  return (
    <div>
      <h2 data-testid={testIds.budgetDisplay} className="text-xl font-semibold mb-4">
        Jogadores — Orçamento: R$ {budget}
      </h2>
      {players.map((player: Player) => (
        <div
          key={player.id}
          data-testid={testIds.playerCard}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <p data-testid={testIds.playerName} className="font-medium">{player.name}</p>
              <p data-testid={testIds.playerPosition} className="text-sm text-gray-600">{player.position}</p>
              <p data-testid={testIds.playerTeam} className="text-sm text-gray-500">{player.team}</p>
              <p data-testid={testIds.playerPoints} className="text-sm text-gray-500">Pontos: {player.total_points}</p>
            </div>
            <div className="flex items-center gap-4">
              <span data-testid={testIds.playerPrice} className="font-semibold">R$ {player.price}</span>
              <button
                data-testid={testIds.buyButton}
                onClick={() => onBuyPlayer(player)}
                disabled={budget < player.price}
                className={`px-3 py-1 rounded transition
                  ${budget >= player.price
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const renderPlayerListPage = (onBuyPlayer: (player: Player) => void, budget: number) => {
  render(
    <TeamProvider>
      <PlayerListPage onBuyPlayer={onBuyPlayer} budget={budget} />
    </TeamProvider>
  );
};

export default PlayerListPage;
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamProvider } from '../../context/TeamContext';
import { Player } from '../../types/player';
import { expect, vi } from 'vitest';
import { useState } from 'react';

export class TeamPage {
  private readonly testIds = {
    playerCard: 'player-card',
    playerName: 'player-name',
    playerPosition: 'player-position',
    playerTeam: 'player-team',
    playerPoints: 'player-points',
    removeButton: 'remove-button',
    budgetDisplay: 'budget-display',
    emptyMessage: 'empty-message'
  };

  constructor(
    private onRemovePlayer: ReturnType<typeof vi.fn<(player: Player) => void>>,
    private initialBudget: number,
    private initialPlayers: Player[]
  ) {}

  // Métodos auxiliares
  private getByTestId(testId: string) {
    return screen.getByTestId(testId);
  }

  private getAllByTestId(testId: string) {
    return screen.getAllByTestId(testId);
  }

  render() {
    const TestTeam = () => {
      const [players, setPlayers] = useState<Player[]>(this.initialPlayers);
      const [budget, setBudget] = useState<number>(this.initialBudget);

      const handleRemovePlayer = (player: Player) => {
        setPlayers(prev => prev.filter(p => p.id !== player.id));
        setBudget(prev => prev + player.price);
        this.onRemovePlayer(player);
      };

      return (
        <div>
          <h2 data-testid={this.testIds.budgetDisplay} className="text-xl font-semibold mb-4">
            Meu Time — Orçamento: R$ {budget}
          </h2>
          {players.length === 0 ? (
            <div data-testid={this.testIds.emptyMessage}>Nenhum jogador no time</div>
          ) : (
            players.map((player: Player) => (
              <div
                key={player.id}
                data-testid={this.testIds.playerCard}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow mb-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p data-testid={this.testIds.playerName} className="font-medium">{player.name}</p>
                    <p data-testid={this.testIds.playerPosition} className="text-sm text-gray-600">{player.position}</p>
                    <p data-testid={this.testIds.playerTeam} className="text-sm text-gray-500">{player.team}</p>
                    <p data-testid={this.testIds.playerPoints} className="text-sm text-gray-500">Pontos: {player.total_points}</p>
                  </div>
                  <button
                    data-testid={this.testIds.removeButton}
                    onClick={() => handleRemovePlayer(player)}
                    className="px-3 py-1 rounded transition bg-red-600 text-white hover:bg-red-700"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      );
    };

    render(
      <TeamProvider>
        <TestTeam />
      </TeamProvider>
    );
  }

  // Métodos de Ação
  clicarBotaoRemover(indice: number) {
    const removeButtons = this.getAllByTestId(this.testIds.removeButton);
    fireEvent.click(removeButtons[indice]);
  }

  // Métodos de Verificação
  verificarDadosJogador(jogador: Player, dados: {
    nome: string;
    posicao: string;
    time: string;
    pontos: string;
  }) {
    const playerCards = this.getAllByTestId(this.testIds.playerCard);
    const playerCard = playerCards.find(card => 
      card.textContent?.includes(dados.nome) &&
      card.textContent?.includes(dados.posicao) &&
      card.textContent?.includes(dados.time) &&
      card.textContent?.includes(`Pontos: ${dados.pontos}`)
    );
    expect(playerCard).toBeTruthy();
  }

  verificarChamadaOnRemovePlayer(jogador: Player) {
    expect(this.onRemovePlayer).toHaveBeenCalledWith(jogador);
  }

  verificarOrcamentoAtual(valor: number) {
    const budgetDisplay = this.getByTestId(this.testIds.budgetDisplay);
    expect(budgetDisplay).toHaveTextContent(`Meu Time — Orçamento: R$ ${valor}`);
  }

  verificarMensagemSemJogadores() {
    const emptyMessage = this.getByTestId(this.testIds.emptyMessage);
    expect(emptyMessage).toBeInTheDocument();
  }
} 
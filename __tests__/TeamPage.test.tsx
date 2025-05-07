import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { TeamPage } from './pages/TeamPage';
import { mockPlayers } from './mocks/playerMocks';
import { act } from '@testing-library/react';

describe('TeamPage', () => {
  let teamPage: TeamPage;
  const mockOnRemovePlayer = vi.fn();

  beforeEach(() => {
    mockOnRemovePlayer.mockClear();
    teamPage = new TeamPage(mockOnRemovePlayer, 100, []);
  });

  describe('Renderização', () => {
    it('Deve exibir o orçamento atual corretamente', async () => {
      await act(async () => {
        teamPage.render();
      });
      teamPage.verificarOrcamentoAtual(100);
    });

    it('Deve exibir a mensagem de time vazio quando não houver jogadores', async () => {
      await act(async () => {
        teamPage.render();
      });
      teamPage.verificarMensagemSemJogadores();
    });

    it('Deve exibir os jogadores corretamente', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0]]);
      await act(async () => {
        teamPage.render();
      });
      teamPage.verificarDadosJogador(mockPlayers[0], {
        nome: mockPlayers[0].name,
        posicao: mockPlayers[0].position,
        time: mockPlayers[0].team || '',
        pontos: (mockPlayers[0].total_points || 0).toString()
      });
    });
  });

  describe('Remoção de Jogador', () => {

    it('Deve chamar onRemovePlayer ao remover um jogador', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0]]);
      await act(async () => {
        teamPage.render();
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      teamPage.verificarChamadaOnRemovePlayer(mockPlayers[0]);
    });

    it('Deve permitir remover múltiplos jogadores', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0], mockPlayers[1]]);
      await act(async () => {
        teamPage.render();
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      expect(mockOnRemovePlayer).toHaveBeenCalledTimes(2);
      expect(mockOnRemovePlayer).toHaveBeenNthCalledWith(1, mockPlayers[0]);
      expect(mockOnRemovePlayer).toHaveBeenNthCalledWith(2, mockPlayers[1]);
    });

    it('Deve lidar com remoções simultâneas de jogadores', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0], mockPlayers[1], mockPlayers[2]]);
      await act(async () => {
        teamPage.render();
      });

      await act(async () => {
        teamPage.clicarBotaoRemover(0);
        teamPage.clicarBotaoRemover(1);
      });

      expect(mockOnRemovePlayer).toHaveBeenCalledTimes(2);
      expect(mockOnRemovePlayer).toHaveBeenNthCalledWith(1, mockPlayers[0]);
      expect(mockOnRemovePlayer).toHaveBeenNthCalledWith(2, mockPlayers[1]);
    });
  });

  describe('Orçamento', () => {
    
    it('Deve exibir o orçamento atual corretamente', async () => {
      await act(async () => {
        teamPage.render();
      });
      teamPage.verificarOrcamentoAtual(100);
    });

    it('Deve atualizar o orçamento quando um jogador é removido', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0]]);
      await act(async () => {
        teamPage.render();
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      teamPage.verificarOrcamentoAtual(100 + mockPlayers[0].price);
    });

    it('Deve atualizar o orçamento corretamente ao remover múltiplos jogadores', async () => {
      teamPage = new TeamPage(mockOnRemovePlayer, 100, [mockPlayers[0], mockPlayers[1]]);
      await act(async () => {
        teamPage.render();
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      await act(async () => {
        teamPage.clicarBotaoRemover(0);
      });
      teamPage.verificarOrcamentoAtual(100 + mockPlayers[0].price + mockPlayers[1].price);
    });
  });
});
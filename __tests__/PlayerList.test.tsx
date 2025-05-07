import { renderPlayerListPage } from './pages/PlayerListPage';
import { mockPlayers } from './mocks/playerMocks';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import '@vitest/expect';
import { screen, fireEvent, act } from '@testing-library/react';
import useSWR, { KeyedMutator } from 'swr';

vi.mock('swr');

describe('PlayerList', () => {
  const mockOnBuyPlayer = vi.fn();

  beforeEach(() => {
    mockOnBuyPlayer.mockClear();
    vi.mocked(useSWR).mockImplementation((key) => {
      if (key === '/api/players') {
        return {
          data: mockPlayers,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: vi.fn() as KeyedMutator<unknown>,
        };
      }
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
        isValidating: false,
        mutate: vi.fn() as KeyedMutator<unknown>,
      };
    });
  });

  describe('Renderização', () => {
    it('Deve exibir o orçamento atual corretamente', async () => {
      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const budgetDisplay = screen.getByTestId('budget-display');
      expect(budgetDisplay).toHaveTextContent('Jogadores — Orçamento: R$ 100');
    });

    it('Deve exibir a mensagem de erro quando houver falha no carregamento', async () => {
      vi.mocked(useSWR).mockImplementationOnce(() => ({
        data: undefined,
        error: new Error('Erro ao carregar'),
        isLoading: false,
        isValidating: false,
        mutate: vi.fn(),
      }));

      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
    });

    it('Deve exibir a mensagem de lista vazia quando não houver jogadores', async () => {
      vi.mocked(useSWR).mockImplementationOnce(() => ({
        data: [],
        error: undefined,
        isLoading: false,
        isValidating: false,
        mutate: vi.fn(),
      }));

      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const emptyMessage = screen.getByTestId('empty-message');
      expect(emptyMessage).toBeInTheDocument();
    });

    it('Deve exibir os dados dos jogadores corretamente', async () => {
      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const playerCards = screen.getAllByTestId('player-card');
      expect(playerCards).toHaveLength(mockPlayers.length);
    });
  });

  describe('Interação', () => {
    it('Deve desabilitar o botão de comprar quando o orçamento é insuficiente', async () => {
      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 10);
      });
      const buyButtons = screen.getAllByTestId('buy-button');
      expect(buyButtons[0]).toBeDisabled();
    });

    it('Deve habilitar o botão de comprar quando o orçamento é suficiente', async () => {
      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const buyButtons = screen.getAllByTestId('buy-button');
      expect(buyButtons[0]).not.toBeDisabled();
    });

    it('Deve chamar onBuyPlayer ao clicar no botão de comprar', async () => {
      await act(async () => {
        renderPlayerListPage(mockOnBuyPlayer, 100);
      });
      const buyButtons = screen.getAllByTestId('buy-button');
      fireEvent.click(buyButtons[0]);
      expect(mockOnBuyPlayer).toHaveBeenCalledWith(mockPlayers[0]);
    });
  });
});
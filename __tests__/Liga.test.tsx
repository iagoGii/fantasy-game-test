import { render, screen, fireEvent } from "@testing-library/react";
import LeagueList from "../components/LeagueList";
import useSWR, { MutatorOptions } from "swr";
import { beforeEach, vi } from "vitest";
import { describe, it, expect } from 'vitest';


vi.mock("swr");

describe("Lista de Ligas - Component", () => {
  const mockLeagues = [
    { id: "1", name: "Série A 2025", teams: [{ id: "1", name: "Time 1" }] },
    { id: "2", name: "Série B 2025", teams: [{ id: "2", name: "Time 2" }, { id: "3", name: "Time 3" }] },
  ];

  beforeEach(() => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockLeagues,
      error: undefined,
      isLoading: false,
      mutate: function <MutationData = unknown>(
        data?: unknown,
        opts?: boolean | MutatorOptions<unknown, MutationData> | undefined
      ): Promise<unknown> {
        throw new Error("Function not implemented.");
      },
      isValidating: false,
    });
  });

  it("Deve renderizar as ligas corretamente", () => {
    render(<LeagueList />);

    // Verifica se o container principal contém os elementos esperados
    const leagueCards = screen.getAllByText(/Série/);
    const joinButtons = screen.getAllByText("Entrar");

    expect(leagueCards.length).toBe(2);
    expect(screen.getByText("Série A 2025")).toBeInTheDocument();
    expect(screen.getByText("1 times")).toBeInTheDocument();
    expect(screen.getByText("Série B 2025")).toBeInTheDocument();
    expect(screen.getByText("2 times")).toBeInTheDocument();
    expect(joinButtons.length).toBe(2);
  });

  it("Deve exibir mensagem de erro ao falhar no carregamento", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: new Error("Erro ao carregar"),
      isLoading: false,
      mutate: function <MutationData = unknown>(
        data?: unknown,
        opts?: boolean | MutatorOptions<unknown, MutationData> | undefined
      ): Promise<unknown> {
        throw new Error("Function not implemented.");
      },
      isValidating: false,
    });

    render(<LeagueList />);

    expect(screen.getByText("Erro ao carregar ligas.")).toBeInTheDocument();
  });

  it("Deve exibir mensagem de carregamento enquanto os dados não chegam", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: function <MutationData = unknown>(
        data?: unknown,
        opts?: boolean | MutatorOptions<unknown, MutationData> | undefined
      ): Promise<unknown> {
        throw new Error("Function not implemented.");
      },
      isValidating: false,
    });

    render(<LeagueList />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("Deve exibir um alerta ao clicar no botão 'Entrar'", () => {
    window.alert = vi.fn();
    render(<LeagueList />);

    const enterButton = screen.getAllByText("Entrar")[0];
    fireEvent.click(enterButton);

    expect(window.alert).toHaveBeenCalledWith('Entrou na liga "Série A 2025"');
  });
});
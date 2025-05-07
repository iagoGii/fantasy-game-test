/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TeamForm from "../components/TeamForm";
import "@testing-library/jest-dom";
import { mockCreateTeam } from "../__tests__/mocks/teamMocks";

// Substituindo a função createTeam pelo mock manual
vi.mock("../lib/api", () => ({
  createTeam: (teamData: { name: string }) => mockCreateTeam(teamData),
}));

describe("Componente TeamForm", () => {
  it("Deve criar um time com sucesso (cenário positivo)", async () => {
    render(<TeamForm />);

    const input = screen.getByPlaceholderText("Nome do Time");
    const button = screen.getByText("Criar");

    fireEvent.change(input, { target: { value: "Time A" } });
    fireEvent.click(button);

    const successMessage = await screen.findByText(/Time \"Time A\" criado/);
    expect(successMessage).toBeInTheDocument();
  });

  it("Deve exibir uma mensagem de erro quando a criação do time falhar (cenário negativo)", async () => {
    render(<TeamForm />);

    const input = screen.getByPlaceholderText("Nome do Time");
    const button = screen.getByText("Criar");

    fireEvent.change(input, { target: { value: "Time B" } });
    fireEvent.click(button);

    // Ajustando o matcher para verificar a mensagem de erro
    const errorMessage = await screen.findByText((content, element) => {
      return element?.textContent === "Erro ao criar time.";
    });
    expect(errorMessage).toBeInTheDocument();
  });
});
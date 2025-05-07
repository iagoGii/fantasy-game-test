import { render, screen } from "@testing-library/react";
import Container from "../components/Container";
import { describe, it, expect } from 'vitest';

describe("Container Component", () => {
  it("deve renderizar o conteúdo passado como children", () => {
    render(
      <Container>
        <p>Conteúdo do Container</p>
      </Container>
    );

    expect(screen.getByText("Conteúdo do Container")).toBeInTheDocument();
  });
});
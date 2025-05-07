import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import { describe, it, expect } from 'vitest';

describe("Card Component", () => {
  it("deve renderizar o conteúdo passado como children", () => {
    render(
      <Card>
        <p>Conteúdo do Card</p>
      </Card>
    );

    expect(screen.getByText("Conteúdo do Card")).toBeInTheDocument();
  });
});
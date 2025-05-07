import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import Navbar from '../../components/Navbar';

export class NavbarPage {
  private readonly testIds = {
    menuButton: 'menu-button',
    navigation: 'navigation',
    dashboardLink: 'dashboard-link',
    teamLink: 'team-link',
    leagueLink: 'league-link'
  };

  constructor() {}

  // Métodos auxiliares
  private getByTestId(testId: string) {
    return screen.getByTestId(testId);
  }

  render() {
    render(<Navbar />);
  }

  // Métodos de Ação
  clicarMenu() {
    const menuButton = this.getByTestId(this.testIds.menuButton);
    fireEvent.click(menuButton);
  }

  clicarDashboard() {
    const dashboardLink = this.getByTestId(this.testIds.dashboardLink);
    fireEvent.click(dashboardLink);
  }

  clicarMeuTime() {
    const teamLink = this.getByTestId(this.testIds.teamLink);
    fireEvent.click(teamLink);
  }

  clicarLigas() {
    const leagueLink = this.getByTestId(this.testIds.leagueLink);
    fireEvent.click(leagueLink);
  }

  // Métodos de Verificação
  verificarMenuAberto() {
    const navigation = this.getByTestId(this.testIds.navigation);
    expect(navigation).toHaveClass('flex');
  }

  verificarMenuFechado() {
    const navigation = this.getByTestId(this.testIds.navigation);
    expect(navigation).toHaveClass('hidden');
  }

  verificarLinkAtivo(linkText: string) {
    const linkId = `${linkText.toLowerCase()}-link` as keyof typeof this.testIds;
    const link = this.getByTestId(this.testIds[linkId]);
    expect(link).toHaveClass('bg-blue-600');
    expect(link).toHaveClass('text-white');
  }

  verificarLinkVisivel(linkText: string) {
    const linkId = `${linkText.toLowerCase()}-link` as keyof typeof this.testIds;
    const link = this.getByTestId(this.testIds[linkId]);
    expect(link).toBeVisible();
  }
} 
/// <reference types="cypress" />

describe('Menu Responsivo', () => {
  beforeEach(() => {
    cy.viewport('iphone-6'); // Viewport mobile
    cy.visit('/');
  });

  it('Deve abrir e fechar o menu mobile', () => {
    // Menu deve estar fechado inicialmente
    cy.get('nav').should('have.class', 'hidden');

    // Abrir menu
    cy.toggleMenu();
    cy.get('nav').should('have.class', 'flex');

    // Fechar menu
    cy.toggleMenu();
    cy.get('nav').should('have.class', 'hidden');
  });

  it('Deve navegar corretamente pelos links do menu', () => {
    // Abrir menu
    cy.toggleMenu();

    // Clicar em Dashboard
    cy.Dashboard();
    cy.IncludeDashboard();
    cy.Time();

    // Abrir menu novamente
    cy.toggleMenu();
    cy.Time(); 

    // Clicar em Meu Time
    cy.toggleMenu();
    cy.meuTime();
    cy.IncludeTeam();
    cy.Time();
    
    // Abrir menu novamente
    cy.toggleMenu();
    cy.Time();

    // Clicar em Ligas
    cy.toggleMenu();
    cy.contains('Ligas').click();
    cy.Time();
    cy.url().should('include', '/league');
  });

  it('Deve destacar o link ativo', () => {
    // Navegar para Dashboard
    cy.visit('/dashboard');
    cy.toggleMenu();
    cy.contains('Dashboard').should('have.class', 'bg-blue-600');
    cy.Time();

    // Navegar para Meu Time
    cy.visit('/team');
    cy.toggleMenu();
    cy.contains('Meu Time').should('have.class', 'bg-blue-600');
    cy.Time();

    // Navegar para Ligas
    cy.visit('/league');
    cy.toggleMenu();
    cy.contains('Ligas').should('have.class', 'bg-blue-600');
    cy.Time();
  });
}); 
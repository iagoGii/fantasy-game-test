/// <reference types="cypress" />

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-13');
    });

    it('Deve mostrar todos os links de navegação', () => {
      cy.contains('Dashboard').should('be.visible');
      cy.contains('Meu Time').should('be.visible');
      cy.contains('Ligas').should('be.visible');
    });

    it('Deve destacar o link ativo', () => {
      // Dashboard
      cy.visit('/dashboard');
      cy.Time();
      cy.contains('Dashboard').should('have.class', 'bg-blue-600');

      // Meu Time
      cy.visit('/team');
      cy.contains('Meu Time').should('have.class', 'bg-blue-600');

      // Ligas
      cy.visit('/league');
      cy.Time();
      cy.contains('Ligas').should('have.class', 'bg-blue-600');
    });

    it('Deve navegar corretamente', () => {
      cy.Dashboard();
      cy.Time();
      cy.IncludeDashboard();
      

      cy.meuTime()
      cy.Time();
      cy.IncludeTeam();

      cy.contains('Ligas').click();
      cy.Time();
      cy.url().should('include', '/league');
    });
  });

  describe('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('deve abrir e fechar o menu mobile', () => {
      // Menu deve estar fechado inicialmente
      cy.verifyNavHidden();

      // Abrir menu
      cy.toggleMenu();
      cy.get('nav').should('have.class', 'flex');

      // Fechar menu
      cy.toggleMenu();
      cy.verifyNavHidden();
    });

    it('deve navegar e fechar o menu após clicar em um link', () => {
      // Abrir menu
      cy.toggleMenu();
      
      // Clicar em Dashboard
      cy.Dashboard();
      cy.IncludeDashboard();
     

      // Abrir menu novamente
      cy.toggleMenu();
      
      // Clicar em Meu Time
      cy.toggleMenu();
      cy.meuTime();
      cy.IncludeTeam();
      cy.get('h1').contains('Meu Time').should('be.visible');
      cy.get('h2').contains('Jogadores do Time').should('be.visible');
      cy.contains('Nenhum jogador adicionado ainda.').should('be.visible');
      cy.get('strong').contains('R$100').should('be.visible');
      cy.contains('Ligas').click();
    });
  });
});
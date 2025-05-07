/// <reference types="cypress" />

describe('Fluxo de Compra de Jogador', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Deve remover o card do Pedro após clicar em Comprar', () => {
    cy.Time(); // Aguarda 2 segundos para garantir que a página carregou completamente

    // 1. Verifica que o card do "Pedro" existe
    cy.contains('.font-medium', 'Pedro').should('be.visible');

    // 2. Clica no botão "Comprar" dentro do card do "Pedro"
    cy.BuyPlayer();
    cy.Time();

    // 3. Aguarda (se necessário) e verifica que o card não existe mais
    cy.contains('.font-medium', 'Pedro').should('not.exist');
    cy.meuTime();
    cy.Time(); 

    // Valida o orçamento sobrando
    cy.contains('p', 'Orçamento sobrando:').should('contain.text', 'R$78');
    
    // Valida que o jogador Pedro está listado com os detalhes corretos
    cy.contains('li', 'Pedro (Atacante) — R$22').should('be.visible');
  });

  it('Deve comprar o jogador Pedro e verificar se ele está no Meu Time e remover logo em seguida!', () => {
    cy.Time(); 

    cy.contains('.font-medium', 'Pedro').should('be.visible');

    cy.BuyPlayer();
    cy.Time();
    cy.contains('.font-medium', 'Pedro').should('not.exist');

    cy.meuTime();
    cy.Time();

    cy.contains('p', 'Orçamento sobrando:').should('contain.text', 'R$78');
    cy.contains('li', 'Pedro (Atacante) — R$22').should('be.visible');
    cy.Time()
    cy.contains('button', 'Remover').click();
    cy.Time();
    cy.Dashboard();
  });

});

describe('Fluxo de Compra de Jogador no Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6'); // Viewport mobile
    cy.visit('/dashboard');
  });

  it('Deve comprar o jogador Pedro e verificar se ele está no Meu Time', () => {
    cy.Time(); 

    cy.contains('.font-medium', 'Pedro').should('be.visible');

    cy.BuyPlayer();
    cy.Time();
    cy.contains('.font-medium', 'Pedro').should('not.exist');

    cy.toggleMenu();
    cy.meuTime();
    cy.Time();

    cy.contains('p', 'Orçamento sobrando:').should('contain.text', 'R$78');
    cy.contains('li', 'Pedro (Atacante) — R$22').should('be.visible');

  });

});

describe('Deve comprar jogador, validar se está no time e remover o jogador do time no Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-6'); // Viewport mobile
    cy.visit('/dashboard');
  });

  it('Deve comprar o jogador Pedro e verificar se ele está no Meu Time e remover logo em seguida!', () => {
    cy.Time(); 

    cy.contains('.font-medium', 'Pedro').should('be.visible');

    cy.BuyPlayer();
    cy.Time();
    cy.contains('.font-medium', 'Pedro').should('not.exist');

    cy.toggleMenu();
    cy.meuTime();
    cy.Time();

    cy.contains('p', 'Orçamento sobrando:').should('contain.text', 'R$78');
    cy.contains('li', 'Pedro (Atacante) — R$22').should('be.visible');
    cy.Time()
    cy.contains('button', 'Remover').click();
    cy.Time();
    cy.Dashboard();
  });

});
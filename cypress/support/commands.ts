/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      verifyNavHidden(): Chainable<void>;
      toggleMenu(): Chainable<void>;
      meuTime(): Chainable<void>;
      Dashboard(): Chainable<void>;
      IncludeTeam(): Chainable<void>;
      IncludeDashboard(): Chainable<void>;
      Time(): Chainable<void>;
      BuyPlayer(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('Time', () => {
    cy.wait(2000);
});

Cypress.Commands.add('verifyNavHidden', () => {
  cy.get('nav').should('have.class', 'hidden');
});

Cypress.Commands.add('toggleMenu', () => {
  cy.get('button[aria-label="Toggle menu"]').click();
});

Cypress.Commands.add('meuTime', () => {
    cy.contains('Meu Time').click();
});

Cypress.Commands.add('Dashboard', () => {
    cy.contains('Dashboard').click();
});

Cypress.Commands.add('IncludeDashboard', () => {
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('IncludeTeam', () => {
    cy.url().should('include', '/team');
});

Cypress.Commands.add('BuyPlayer', () => {
    cy.contains('.font-medium', 'Pedro').closest('.p-4').find('button').contains('Comprar').click();
});
/// <reference types="Cypress" />

describe('Person Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('api/person/*').as('getPersonInfo');
    cy.visit('/person/6384');
  });

  it('should render the person page', () => {
    cy.getByTestId('person-page').should('be.visible');
  });

  it('should fetch and display person info', () => {
    cy.wait('@getPersonInfo');
    cy.getByTestId('person-page').should('contain', 'Keanu Reeves');
  });
});

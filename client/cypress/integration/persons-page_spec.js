/// <reference types="Cypress" />

describe('Persons Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('api/person/popular*').as('getPopular');
    cy.visit('/person');
  });

  it('should render the persons page', () => {
    cy.getByTestId('persons-page').should('be.visible');
  });

  it('should fetch and display movies', () => {
    cy.wait('@getPopular');
    cy.getByTestId('grid').should('be.visible');
  });

  it('should be able to change results page', () => {
    cy.wait('@getPopular');
    cy.getByTestId('pagination').should('be.visible');

    cy.getByTestId('pagination').within(pagination => {
      cy.getByTestId('pagination-active-page').should('have.text', '1');
      cy.getByText('2').click();
      cy.getByTestId('pagination-active-page').should('have.text', '2');
      cy.assertRoute('/person?page=2');
    });
  });

  it('navigates to page of selected person', () => {
    cy.wait('@getPopular');

    cy.getAllByTestId('person-card').then(personsCards => {
      const personCard = personsCards[0];
      const personId = personCard.href.split('/').pop();
      cy.get(personCard).click();
      cy.assertRoute(`/person/${personId}`);
    });
  });
});

/// <reference types="Cypress" />

describe('Movie Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('api/movie/*').as('getMovieInfo');
    cy.visit('/movie/458156');
  });

  it('should render the movie page', () => {
    cy.getByTestId('movie-page').should('be.visible');
    cy.getByTestId('grid').should('be.visible');
  });

  it('should fetch and display movie info', () => {
    cy.wait('@getMovieInfo');
    cy.getByTestId('movie-page').should(
      'contain',
      'John Wick: Chapter 3 – Parabellum'
    );
  });

  it('navigates to page of selected person', () => {
    cy.wait('@getMovieInfo');

    cy.getAllByTestId('person-card').then(personsCards => {
      const personCard = personsCards[0];
      const personId = personCard.href.split('/').pop();
      cy.get(personCard).click();
      cy.assertRoute(`/person/${personId}`);
    });
  });
});

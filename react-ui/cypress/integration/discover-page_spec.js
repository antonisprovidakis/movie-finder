/// <reference types="Cypress" />

describe('Discover Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('api/discover/movie*').as('discoverMovies');
    cy.visit('/discover');
  });

  it('should render the discover page', () => {
    cy.getByTestId('discover-page').should('be.visible');
    cy.getByTestId('discovery-form').should('be.visible');
  });

  it('should fetch and display movies', () => {
    cy.wait('@discoverMovies');
    cy.getByTestId('grid').should('be.visible');
  });

  it('should be able to change results page', () => {
    cy.wait('@discoverMovies');

    cy.getByTestId('pagination').should('be.visible');

    cy.getByTestId('pagination').within(pagination => {
      cy.getByTestId('pagination-active-page').should('have.text', '1');
      cy.getByText('2').click();
      cy.getByTestId('pagination-active-page').should('have.text', '2');
      cy.assertRoute(`/discover?page=2`);
    });
  });

  it('navigates to page of selected movie', () => {
    cy.wait('@discoverMovies');

    cy.getAllByTestId('movie-card', { exact: false }).then(movieCards => {
      const movieCard = movieCards[0];
      const movieId = movieCard.href.split('/').pop();
      cy.get(movieCard).click();
      cy.assertRoute(`/movie/${movieId}`);
    });
  });
});

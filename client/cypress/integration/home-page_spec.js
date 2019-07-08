/// <reference types="Cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('api/movie/popular*').as('getPopular');
    cy.route('api/movie/now-playing*').as('getNowPlaying');
    cy.route('api/movie/upcoming*').as('getUpcoming');
    cy.visit('/');
  });

  it('should render the home page', () => {
    cy.getByTestId('home-page').should('be.visible');
    cy.getByTestId('movie-section-popular').should('be.visible');
    cy.getByTestId('movie-section-nowPlaying').should('be.visible');
    cy.getByTestId('movie-section-upcoming').should('be.visible');
  });

  it('should fetch and display movies', () => {
    cy.wait(['@getPopular', '@getNowPlaying', '@getUpcoming']);
    cy.getAllByTestId('grid').should('have.length', 3);
    cy.getAllByTestId('movie-card').should('have.length', 12);
  });

  it('navigates to page of selected movie', () => {
    cy.wait(['@getPopular', '@getNowPlaying', '@getUpcoming']);

    cy.getAllByTestId('movie-card').then(movieCards => {
      const movieCard = movieCards[0];
      const movieId = movieCard.href.split('/').pop();
      cy.get(movieCard).click();
      cy.assertRoute(`/movie/${movieId}`);
    });
  });

  it('navigates to popular movies page through section button', () => {
    cy.getByTestId('btn-more-popular').click();
    cy.assertRoute('/movie/popular');
  });

  it('navigates to now-playing movies page through section button', () => {
    cy.getByTestId('btn-more-nowPlaying').click();
    cy.assertRoute('/movie/now-playing');
  });

  it('navigates to upcoming movies page through section button', () => {
    cy.getByTestId('btn-more-upcoming').click();
    cy.assertRoute('/movie/upcoming');
  });
});

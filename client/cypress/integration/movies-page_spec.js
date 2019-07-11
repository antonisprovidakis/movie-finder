/// <reference types="Cypress" />

describe('Movies Page', () => {
  ['popular', 'now-playing', 'upcoming', 'top-rated'].forEach(category => {
    describe(`Movies Page: ${category}`, () => {
      it('should render movies page', () => {
        cy.visit(`/movie/${category}`);
        cy.getByTestId('movies-page').should('be.visible');
      });

      it('should fetch and display movies', () => {
        cy.server();
        cy.route(`api/movie/${category}*`).as('getData');
        cy.visit(`/movie/${category}`);

        cy.wait('@getData');

        cy.getByTestId('grid').should('be.visible');
      });

      it('should be able to change results page', () => {
        cy.server();
        cy.route(`api/movie/${category}*`).as('getData');
        cy.visit(`/movie/${category}`);

        cy.wait('@getData').then(xhr => {
          const totalPages = xhr.response.body.total_pages;

          if (totalPages > 1) {
            cy.getByTestId('pagination').should('be.visible');

            cy.getByTestId('pagination').within(pagination => {
              cy.getByTestId('pagination-active-page').should('have.text', '1');
              cy.getByText('2').click();
              cy.getByTestId('pagination-active-page').should('have.text', '2');
              cy.assertRoute(`/movie/${category}?page=2`);
            });
          }
        });
      });

      it('navigates to page of selected movie', () => {
        cy.server();
        cy.route(`api/movie/${category}*`).as('getData');
        cy.visit(`/movie/${category}`);

        cy.wait('@getData');

        cy.getAllByTestId('movie-card', { exact: false }).then(movieCards => {
          const movieCard = movieCards[0];
          const movieId = movieCard.href.split('/').pop();
          cy.get(movieCard).click();
          cy.assertRoute(`/movie/${movieId}`);
        });
      });
    });
  });
});

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesByCategory, setMovieCardViewStyle } from '../redux/actions';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/MoviesPage.css';
import { routeNameToTitle } from '../utils/routing';
import Pagination from '../components/Pagination';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';
import { extractPageFromQueryString, determinePage } from '../utils/page';

function MoviesPage({ category, movies, page, loading, totalPages, cardViewStyle, history, location, loadMoviesByCategory, setMovieCardViewStyle }) {
    const title = routeNameToTitle(category);
    const [gridColumns, setGridColumns] = useState(4);

    useEffect(() => {
        loadMoviesByCategory(category, { page, region: 'US' });
    }, [category, page]);

    useEffect(() => {
        cardViewStyle === 'poster'
            ? setGridColumns(4)
            : setGridColumns(2);
    }, [cardViewStyle]);

    function gotoPage(newPage) {
        history.push({
            pathname: location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
    }

    function handleCardViewStyleOptionClick(e, newCardViewStyle) {
        if (cardViewStyle !== newCardViewStyle) {
            setMovieCardViewStyle(newCardViewStyle);
        }
    }

    return (
        <div className="MoviesPage">
            <div className="MoviesPage__movies-container">
                {loading
                    ?
                    <MoviesGridPlaceholder
                        title={title}
                        num={12}
                        columns={gridColumns}
                        doubling
                    />
                    :
                    <MoviesGrid
                        title={title}
                        columns={gridColumns}
                        doubling
                        menuVisible
                        movies={movies}
                        cardViewStyle={cardViewStyle}
                        onCardViewStyleOptionClick={handleCardViewStyleOptionClick}
                    />
                }
            </div>

            <Pagination
                activePage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                topPadded
                disabled={loading}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const category = ownProps.match.params.category;
    const cachedMovies = state.entities.movies;
    const movieIdsBySelectedCategory = state.pagination.moviesByCategory[category] || {};
    const pages = movieIdsBySelectedCategory.pages || {};
    const totalPages = movieIdsBySelectedCategory.totalPages || null;
    const pageFromQuery = extractPageFromQueryString(ownProps.location.search);
    // TODO: (SSR) - To be implemented
    // if page > totalPages, set page equals to totalPages
    const page = determinePage(pageFromQuery);
    const movieIds = pages[page] || [];
    const movies = movieIds.map(id => cachedMovies[id]);
    const loading = movieIdsBySelectedCategory.isFetching || false;

    const cardViewStyle = state.ui.movieCardViewStyle;

    return {
        category,
        page,
        movies,
        loading,
        // TODO: this is a temp fix due to a limitation of TMDb (> 1000 returns error)
        totalPages: totalPages > 1000 ? 1000 : totalPages,
        cardViewStyle
    }
}

export default connect(mapStateToProps, {
    loadMoviesByCategory, setMovieCardViewStyle
})(MoviesPage);

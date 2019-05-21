import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesByCategory, setMovieCardViewStyle } from '../redux/actions';
import CollectionGrid from '../components/CollectionGrid';
import '../styles/MoviesPage.css';
import { routeNameToTitle } from '../utils/routing';
import Pagination from '../components/Pagination';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';
import { extractPageFromQueryString, determinePage } from '../utils/page';
import { Dropdown } from 'semantic-ui-react';
import PosterMovieCard from '../components/PosterMovieCard';
import BackdropMovieCard from '../components/BackdropMovieCard';

const movieCardTypes = {
    poster: PosterMovieCard,
    backdrop: BackdropMovieCard
};

function MoviesPage({ category, page, movies, loading, totalPages, history, location, movieCardViewStyle, setMovieCardViewStyle, loadMoviesByCategory }) {
    const title = routeNameToTitle(category);
    const [gridColumns, setGridColumns] = useState(movieCardViewStyle === 'poster' ? 4 : 2);

    useEffect(() => {
        loadMoviesByCategory(category, { page, region: 'US' });
    }, [category, page]);

    useEffect(() => {
        const cols = movieCardViewStyle === 'poster' ? 4 : 2;
        setGridColumns(cols);
    }, [movieCardViewStyle]);

    function gotoPage(newPage) {
        history.push({
            pathname: location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
    }

    function handleCardViewStyleOptionClick(e, item) {
        const newMovieCardViewStyle = item.value;
        setMovieCardViewStyle(newMovieCardViewStyle);
    }

    const moviesGridMenuItems = [
        <Dropdown text='View'>
            <Dropdown.Menu>
                <Dropdown.Item
                    text='Poster Card View'
                    value='poster'
                    onClick={handleCardViewStyleOptionClick}
                />
                <Dropdown.Item
                    text='Backdrop Card View'
                    value='backdrop'
                    onClick={handleCardViewStyleOptionClick}
                />
            </Dropdown.Menu>
        </Dropdown>
    ];

    function renderItem(item) {
        const MovieCardComponent = movieCardTypes[movieCardViewStyle];
        return <MovieCardComponent movie={item} />
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
                    <CollectionGrid
                        title={title}
                        columns={gridColumns}
                        doubling
                        collection={movies}
                        renderItem={renderItem}
                        menuItems={moviesGridMenuItems}
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

    const movieCardViewStyle = state.ui.movieCardViewStyle;

    return {
        category,
        page,
        movies,
        loading,
        // TODO: this is a temp fix due to a limitation of TMDb (> 1000 returns error)
        totalPages: totalPages > 1000 ? 1000 : totalPages,
        movieCardViewStyle
    }
}

export default connect(mapStateToProps, {
    loadMoviesByCategory, setMovieCardViewStyle
})(MoviesPage);

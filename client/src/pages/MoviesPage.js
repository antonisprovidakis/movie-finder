import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesByCategory, setMovieCardViewStyle } from '../redux/actions';
import CollectionGrid from '../components/CollectionGrid';
import '../styles/MoviesPage.css';
import { routeNameToTitle } from '../utils/routing';
import Pagination from '../components/Pagination';
import { getPageFromQueryString } from '../utils/page';
import { Dropdown } from 'semantic-ui-react';
import PosterMovieCard from '../components/PosterMovieCard';
import BackdropMovieCard from '../components/BackdropMovieCard';
import PosterMovieCardPlaceholder from '../components/PosterMovieCardPlaceholder';

const movieCardTypes = {
    poster: PosterMovieCard,
    backdrop: BackdropMovieCard
};

function MoviesPage({
    category,
    page,
    movies,
    totalPages,
    isFetching,
    history,
    location,
    movieCardViewStyle,
    setMovieCardViewStyle,
    loadMoviesByCategory
}) {
    const title = routeNameToTitle(category);
    const [gridColumns, setGridColumns] = useState(movieCardViewStyle === 'poster' ? 4 : 2);

    useEffect(() => {
        loadMoviesByCategory(category, { page, region: 'US' });
    }, [loadMoviesByCategory, category, page]);

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

    function renderPlaceholderItem() {
        // TODO: or BackdropMovieCardPlaceholder (not implemented, yet)
        return <PosterMovieCardPlaceholder />;
    }

    const shouldRenderPagination = totalPages > 1 && page <= totalPages;

    return (
        <div className="MoviesPage">
            <div className="MoviesPage__movies-container">
                <CollectionGrid
                    title={title}
                    collection={movies}
                    renderItem={renderItem}
                    menuItems={moviesGridMenuItems}
                    placeholderItemsCount={20}
                    renderPlaceholderItem={renderPlaceholderItem}
                    loading={isFetching}
                    columns={gridColumns}
                    doubling
                />
            </div>

            {shouldRenderPagination &&
                < Pagination
                    activePage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    topPadded
                    disabled={isFetching}
                />}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const category = ownProps.match.params.category;
    const cachedMovies = state.entities.movies;
    const {
        isFetching = false,
        totalPages = undefined,
        pages = {}
    } = state.pagination.moviesByCategory[category] || {};
    const page = getPageFromQueryString(ownProps.location.search);
    const movieIds = pages[page] || [];
    const movies = movieIds.map(id => cachedMovies[id]);
    const movieCardViewStyle = state.ui.movieCardViewStyle;

    return {
        category,
        page,
        movies,
        isFetching,
        totalPages,
        movieCardViewStyle
    }
}

export default connect(mapStateToProps, {
    loadMoviesByCategory, setMovieCardViewStyle
})(MoviesPage);

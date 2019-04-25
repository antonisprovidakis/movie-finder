import React, { useState, useEffect } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Movies.css';
import { movieAPI } from '../api';
import { routeNameToTitle } from '../utilities/routing';
import Pagination from '../components/Pagination';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';

function Movies(props) {
    const category = props.match.params.category;
    const title = routeNameToTitle(category);
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page') || 1; // TODO: 0 < page < 1000

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [cardViewStyle, setCardViewStyle] = useState('poster');
    const [gridColumns, setGridColumns] = useState(4);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies(category, page);
    }, [category, page]);

    useEffect(() => {
        cardViewStyle === 'poster'
            ? setGridColumns(4)
            : setGridColumns(2);
    }, [cardViewStyle]);

    async function fetchMovies(category, page) {
        setLoading(true);

        const res = await movieAPI.getMoviesByCategory(
            category,
            { page }
        );

        setTotalPages(res.total_pages);

        const movies = res.results;
        setMovies(movies);
        setLoading(false);
    }

    function gotoPage(newPage) {
        props.history.push({
            pathname: props.location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
    }

    function handleCardViewStyleOptionClick(e, cardViewStyle) {
        setCardViewStyle(cardViewStyle);
    }

    return (
        <div className="Movies">
            <div className="Movies__movies-container">
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

export default Movies;

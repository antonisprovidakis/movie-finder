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
    const [movies, setMovies] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [cardViewStyle, setCardViewStyle] = useState('poster');
    const [gridColumns, setGridColumns] = useState(4);

    useEffect(() => {
        fetchMovies(category);
    }, [category, pagination.page]);

    useEffect(() => {
        cardViewStyle === 'poster'
            ? setGridColumns(4)
            : setGridColumns(2);
    }, [cardViewStyle]);

    async function fetchMovies(category) {
        const res = await movieAPI.getMoviesByCategory(
            category,
            { page: pagination.page }
        );

        setPagination({
            page: res.data.page,
            totalPages: res.data.total_pages
        });

        const movies = res.data.results;
        setMovies(movies);
    }

    function handlePageChange(e, data) {
        setPagination(prevState => ({ ...prevState, page: data.activePage }));
    }

    function handleCardViewStyleOptionClick(e, cardViewStyle) {
        setCardViewStyle(cardViewStyle);
    }

    return (
        <div className="Movies">
            <div className="Movies__movies-container">
                {movies.length > 0
                    ?
                    <MoviesGrid
                        title={title}
                        columns={gridColumns}
                        doubling
                        menuVisible
                        movies={movies}
                        cardViewStyle={cardViewStyle}
                        onCardViewStyleOptionClick={handleCardViewStyleOptionClick}
                    />
                    :
                    <MoviesGridPlaceholder
                        title={title}
                        num={12}
                        columns={gridColumns}
                        doubling
                    />
                }
            </div>

            {movies.length > 0 &&
                <Pagination
                    activePage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    topPadded
                />
            }
        </div>
    );
}

export default Movies;

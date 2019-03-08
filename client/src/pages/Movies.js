import React, { useState, useEffect } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Movies.css';
import { movieAPI } from '../api';
import { routeNameToTitle } from '../utilities/routing';
import PosterMovieCard from '../components/PosterMovieCard';
import Pagination from '../components/Pagination';
import useMedia, { mobileMediaQuery } from '../utilities/hooks/useMedia';

function Movies(props) {
    const category = props.match.params.category;
    const title = routeNameToTitle(category);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const isMobile = useMedia(mobileMediaQuery);

    useEffect(() => {
        fetchMovies(category);
    }, [category, pagination.page, pagination.totalPages]);

    async function fetchMovies(category) {
        setLoading(true);

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

        setLoading(false);
    }

    function handlePageChange(e, data) {
        setPagination(prevState => ({ ...prevState, page: data.activePage }));
    }

    return (
        <div className="Movies">
            {loading
                ? <div>loading...</div>
                :
                <>
                    <div className="Movies__movies-container">
                        <MoviesGrid
                            title={title}
                            columns={4}
                            doubling
                        >
                            {movies.map(movie =>
                                <PosterMovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    date={movie.release_date}
                                    image={movie.poster_path}
                                    rating={movie.vote_average}
                                />

                                // OR
                                //
                                // <BackdropMovieCard
                                //     key={movie.id}
                                //     id={movie.id}
                                //     title={movie.title}
                                //     date={movie.release_date}
                                //     rating={movie.vote_average}
                                //     image={movie.backdrop_path}
                                //     overview={movie.overview}
                                // />
                            )}
                        </MoviesGrid>
                    </div>
                    <Pagination
                        topPadded
                        activePage={pagination.page}
                        totalPages={pagination.totalPages}
                        siblingRange={isMobile ? 0 : 2}
                        boundaryRange={isMobile ? 1 : 2}
                        firstItem={null}
                        lastItem={null}
                        onPageChange={handlePageChange}
                    />
                </>
            }
        </div>
    );
}

export default Movies;

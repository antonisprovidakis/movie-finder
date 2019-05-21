import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../styles/MoviesGrid.css';

function MoviesGrid({
    title = '',
    movies = [],
    movieCardComponent: MovieCard,
    noResultsMessage = 'No results found.',
    menuItems = [],
    ...rest
}) {
    return (
        <div className='MoviesGrid'>
            <div className='MoviesGrid__top'>
                <h2 className='MoviesGrid__top__title'>{title}</h2>
                <div className='MoviesGrid__top__menu'>
                    {menuItems.map((menuItem, index) => {
                        const className = [
                            menuItem.props.className,
                            'MoviesGrid__top__menu_item'
                        ].join(' ').trim();

                        return React.cloneElement(menuItem, {
                            key: index,
                            className
                        })
                    })}
                </div>
            </div>

            {movies.length === 0
                ? noResultsMessage
                :
                <Grid
                    className='MoviesGrid__movies'
                    {...rest}
                >
                    {movies.map(movie =>
                        <Grid.Column key={movie.id} className='MoviesGrid__column'>
                            <MovieCard className='MoviesGrid__column_content' movie={movie} />
                        </Grid.Column>
                    )}
                </Grid>
            }
        </div>
    );
}

export default MoviesGrid;

import React from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';
import '../styles/MoviesGrid.css';
import BackdropMovieCard from './BackdropMovieCard';
import PosterMovieCard from './PosterMovieCard';


function MoviesGrid({
    movies,
    title = '',
    mobileColumnWidthPerRow = 16,
    tabletColumnWidthPerRow = mobileColumnWidthPerRow,
    computerColumnWidthPerRow = tabletColumnWidthPerRow,
    largeScreenColumnWidthPerRow = computerColumnWidthPerRow,
    wideScreenColumnWidthPerRow = largeScreenColumnWidthPerRow,
}) {

    return (
        <div className='MoviesGrid'>
            {title.length > 0 &&
                <Header
                    className="MoviesGrid__title"
                    size='medium'
                >
                    {title}
                </Header>
            }

            <Grid
                className='MoviesGrid__movies'
            >

                {movies.map(movie => (
                    <Grid.Column
                        key={movie.id}
                        className='MoviesGrid__column'
                        mobile={mobileColumnWidthPerRow}
                        tablet={tabletColumnWidthPerRow}
                        computer={computerColumnWidthPerRow}
                        largeScreen={largeScreenColumnWidthPerRow}
                        widescreen={wideScreenColumnWidthPerRow}
                    >
                        {/* <MinimalMovieCard
                            key={movie.id}
                            title={movie.title}
                            year={movie.year}
                            image={movie.image}
                        /> */}

                        <PosterMovieCard
                            key={movie.id}
                            title={movie.title}
                            date={movie.year}
                            image={movie.image}
                            rating={movie.rating}
                        // overview={movie.overview}
                        />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}

export default MoviesGrid;

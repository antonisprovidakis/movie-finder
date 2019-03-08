import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import '../styles/MoviesGrid.css';

function MoviesGrid({
    title = '',
    children, // of type PosterMovieCard || BackdropMovieCard
    ...rest
}) {

    return (
        <div className='MoviesGrid'>
            {title.length > 0 &&
                <Header
                    as='h2'
                    className="MoviesGrid__title"
                >
                    {title}
                </Header>
            }

            <Grid
                className='MoviesGrid__movies'
                {...rest}
            >
                {React.Children.map(children, child =>
                    <Grid.Column className='MoviesGrid__column'>
                        {child}
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default MoviesGrid;

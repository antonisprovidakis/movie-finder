import React from 'react';
import { Grid, Header, Menu, Dropdown } from 'semantic-ui-react';
import '../styles/MoviesGrid.css';
import invoke from 'lodash/invoke';
import PosterMovieCard from './PosterMovieCard';
import BackdropMovieCard from './BackdropMovieCard';

function determineMovieCardComponent(cardViewStyle) {
    switch (cardViewStyle) {
        case 'backdrop':
            return BackdropMovieCard;
        case 'poster':
        default:
            return PosterMovieCard;
    }
}

function MoviesGrid({
    title = '',
    movies,
    cardViewStyle = 'poster', // 'poster' || 'backdrop'
    onCardViewStyleOptionClick,
    menuVisible = false,
    ...rest
}) {
    const MovieCard = determineMovieCardComponent(cardViewStyle);

    function handleCardViewStyleOptionClick(e, item) {
        const cardViewStyle = item.value;
        invoke({ onCardViewStyleOptionClick }, 'onCardViewStyleOptionClick', e, cardViewStyle);
    }

    return (
        <div className='MoviesGrid'>
            {(title.length > 0 || menuVisible) &&
                <Menu secondary>
                    {title.length > 0 &&
                        <Menu.Item fitted>
                            <Header as='h2' className="MoviesGrid__title">
                                {title}
                            </Header>
                        </Menu.Item>
                    }

                    {menuVisible &&
                        <Menu.Menu position='right'>
                            <Menu.Item fitted>
                                <Dropdown text='View'>
                                    <Dropdown.Menu >
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
                            </Menu.Item>
                        </Menu.Menu>
                    }
                </Menu>
            }

            <Grid
                className='MoviesGrid__movies'
                {...rest}
            >
                {movies.map(movie =>
                    <Grid.Column key={movie.id} className='MoviesGrid__column'>
                        <MovieCard movie={movie} />
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default MoviesGrid;

import React from 'react';
import { Grid, Header, Menu } from 'semantic-ui-react';
import PosterMovieCardPlaceholder from './PosterMovieCardPlaceholder';
import _times from 'lodash/times';

function MoviesGridPlaceholder({
    title = '',
    num,
    ...rest
}) {
    return (
        <div className='MoviesGridPlaceholder'>
            {title.length > 0 &&
                <Menu secondary>
                    <Menu.Item fitted>
                        <Header as='h2' className="MoviesGridPlaceholder__title">
                            {title}
                        </Header>
                    </Menu.Item>
                </Menu>
            }

            <Grid
                className='MoviesGridPlaceholder__movies'
                {...rest}
            >
                {_times(num, (index) =>
                    <Grid.Column
                        className='MoviesGridPlaceholder__column'
                        key={index}
                    >
                        <PosterMovieCardPlaceholder />
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default MoviesGridPlaceholder;

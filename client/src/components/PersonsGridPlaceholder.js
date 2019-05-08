import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PersonCardPlaceholder from './PersonCardPlaceholder';
import _times from 'lodash/times';

function PersonsGridPlaceholder({
    title = '',
    numberOfCards,
    forCast = false,
    ...rest
}) {
    return (
        <div className='PersonsGridPlaceholder'>
            {title.length > 0 &&
                <Header
                    as='h2'
                    className="PersonsGridPlaceholder__header"
                >
                    {title}
                </Header>
            }
            <Grid
                className='PersonsGridPlaceholder__persons'
                {...rest}
            >

                {_times(numberOfCards, (index) =>
                    <Grid.Column
                        className='PersonsGridPlaceholder__column'
                        key={index}
                    >
                        <PersonCardPlaceholder forCast={forCast} />
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default PersonsGridPlaceholder;

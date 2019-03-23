import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PersonCardPlaceholder from './PersonCardPlaceholder';
import times from 'lodash/times';

function PeopleGridPlaceholder({
    title = '',
    numberOfCards,
    forCast = false,
    ...rest
}) {
    return (
        <div className='PeopleGridPlaceholder'>
            {title.length > 0 &&
                <Header
                    as='h2'
                    className="PeopleGridPlaceholder__header"
                >
                    {title}
                </Header>
            }
            <Grid
                className='PeopleGridPlaceholder__people'
                {...rest}
            >

                {times(numberOfCards, (index) =>
                    <Grid.Column
                        className='PeopleGridPlaceholder__column'
                        key={index}
                    >
                        <PersonCardPlaceholder forCast={forCast} />
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default PeopleGridPlaceholder;

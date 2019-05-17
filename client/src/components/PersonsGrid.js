import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import '../styles/PersonsGrid.css';
import PersonCard from './PersonCard';

function PersonsGrid({
    title = '',
    persons,
    noResultsMessage = 'No results found.',
    forCast = false,
    ...rest
}) {

    return (
        <div className='PersonsGrid'>
            {title.length > 0 &&
                <Header
                    as='h2'
                    className="PersonsGrid__header"
                >
                    {title}
                </Header>
            }

            {persons.length === 0
                ? noResultsMessage
                :
                <Grid
                    className='PersonsGrid__persons'
                    {...rest}
                >
                    {persons.map(person =>
                        <Grid.Column
                            className='PersonsGrid__column'
                            key={person.id}
                        >
                            <PersonCard
                                id={person.id}
                                name={person.name}
                                image={person.profile_path}
                                sub={forCast ? person.character : ''}
                            />
                        </Grid.Column>
                    )}
                </Grid>
            }
        </div>
    );
}

export default PersonsGrid;

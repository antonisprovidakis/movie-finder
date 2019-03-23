import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import '../styles/PeopleGrid.css';
import PersonCard from './PersonCard';

function PeopleGrid({
    title = '',
    people,
    forCast = false,
    ...rest
}) {

    return (
        <div className='PeopleGrid'>
            {title.length > 0 &&
                <Header
                    as='h2'
                    className="PeopleGrid__header"
                >
                    {title}
                </Header>
            }
            <Grid
                className='PeopleGrid__people'
                {...rest}
            >
                {people.map(person =>
                    <Grid.Column
                        className='PeopleGrid__column'
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
        </div>
    );
}

export default PeopleGrid;

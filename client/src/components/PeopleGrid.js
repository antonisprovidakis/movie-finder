import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PersonCard from './PersonCard';

function PeopleGrid({
    people,
    title = '',
    // itemsPerRow = 4
    mobileColumnWidthPerRow = 16,
    tabletColumnWidthPerRow = mobileColumnWidthPerRow,
    computerColumnWidthPerRow = tabletColumnWidthPerRow,
    largeScreenColumnWidthPerRow = computerColumnWidthPerRow,
    wideScreenColumnWidthPerRow = largeScreenColumnWidthPerRow,
}) {
    return (
        <div className='PeopleGrid'>
            {title.length > 0 &&
                <Header
                    className="PeopleGrid__header"
                    size='medium'
                >
                    {title}
                </Header>
            }
            <Grid
                className='PeopleGrid__people'
            // columns={itemsPerRow}
            // doubling
            // stackable
            >
                {people.map(person => (
                    <Grid.Column
                        key={person.id}
                        mobile={mobileColumnWidthPerRow}
                        tablet={tabletColumnWidthPerRow}
                        computer={computerColumnWidthPerRow}
                        largeScreen={largeScreenColumnWidthPerRow}
                        widescreen={wideScreenColumnWidthPerRow}
                    >
                        <PersonCard
                            key={person.id}
                            name={person.name}
                            image={person.image}
                        />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}

export default PeopleGrid;

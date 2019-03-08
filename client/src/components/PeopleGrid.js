import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import '../styles/PeopleGrid.css';

function PeopleGrid({
    title = '',
    children, // of type PersonCard
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
                {React.Children.map(children, child => (
                    <Grid.Column className='PeopleGrid__column'>
                        {child}
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}

export default PeopleGrid;

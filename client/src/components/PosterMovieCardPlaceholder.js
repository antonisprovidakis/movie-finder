import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';
import '../styles/PosterMovieCard.css';

function PosterMovieCardPlaceholder(props) {
    return (
        <Card
            className="PosterMovieCardPlaceholder"
            fluid
        >
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='long' />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='very short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

export default PosterMovieCardPlaceholder;

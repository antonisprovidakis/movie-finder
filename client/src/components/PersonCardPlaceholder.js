import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

function PersonCardPlaceholder() {
    return (
        <Card className='PersonCardPlaceholder'>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

export default PersonCardPlaceholder;

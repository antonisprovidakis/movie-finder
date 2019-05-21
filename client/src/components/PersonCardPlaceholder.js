import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

function PersonCardPlaceholder({ forCast = false, className = '' }) {
    return (
        <Card className={`PersonCardPlaceholder ${className}`}>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                    {forCast &&
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    }
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

export default PersonCardPlaceholder;

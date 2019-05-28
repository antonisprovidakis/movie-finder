import React from 'react';
import PropTypes from 'prop-types';
import { Card, Placeholder } from 'semantic-ui-react';

function PersonCardPlaceholder({ forCast, className }) {
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

PersonCardPlaceholder.propTypes = {
    forCast: PropTypes.bool,
    className: PropTypes.string
}

PersonCardPlaceholder.defaultProps = {
    forCast: false,
    className: ''
}

export default PersonCardPlaceholder;

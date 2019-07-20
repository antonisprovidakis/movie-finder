import React from 'react';
import PropTypes from 'prop-types';
import { Card, Placeholder } from 'semantic-ui-react';

function MovieCardPlaceholder({ className }) {
  return (
    <Card className={`MovieCardPlaceholder ${className}`} fluid>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length="long" />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="short" />
            <Placeholder.Line length="very short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
    </Card>
  );
}

MovieCardPlaceholder.propTypes = {
  className: PropTypes.string
};

MovieCardPlaceholder.defaultProps = {
  className: ''
};

export default MovieCardPlaceholder;

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MainContent.css';
import { Container } from 'semantic-ui-react';

function MainContent({ className = '', children, ...rest }) {
  return (
    <Container className={`MainContent ${className}`} as="main" {...rest}>
      {children}
    </Container>
  );
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

MainContent.defaultProps = {
  className: ''
};

export default MainContent;

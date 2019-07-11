import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MainContent.css';
import { Container } from 'semantic-ui-react';

function MainContent({ className = '', children, ...rest }) {
  return (
    <main className={`MainContent ${className}`} {...rest}>
      <Container>{children}</Container>
    </main>
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

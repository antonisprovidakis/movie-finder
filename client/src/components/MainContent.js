import React from 'react';
import '../styles/MainContent.css';
import { Container } from 'semantic-ui-react';

function MainContent({ className = '', children, ...rest }) {
    return (
        <Container
            className={`MainContent ${className}`}
            as='main'
            {...rest}
        >
            {children}
        </Container>
    );
}

export default MainContent;
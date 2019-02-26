import React from 'react';
import '../styles/MainContent.css';

function MainContent(props) {
    return (
        <main className="MainContent">
            {props.children}
        </main>
    );
}

export default MainContent;
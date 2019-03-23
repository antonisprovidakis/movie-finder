import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../styles/NotFound.css';

function NotFound() {
    return (
        <div className="NotFound" >
            <h1>Oops!—We can't find the page you're looking for.</h1>
            <Button primary as={Link} to='/'>Go back to Home</Button>
        </div>
    );
}

export default NotFound;

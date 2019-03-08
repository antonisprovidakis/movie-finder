import React from 'react';
import { Pagination as PaginationSUI } from 'semantic-ui-react';
import '../styles/Pagination.css';


function Pagination({ topPadded = false, bottomPadded = false, ...rest }) {
    let className = 'Pagination';

    if (topPadded) {
        className += ' Pagination--top-padded';
    }

    if (bottomPadded) {
        className += ' Pagination--bottom-padded';
    }

    return (
        <div className={className}>
            <PaginationSUI {...rest} />
        </div>
    );
}

export default Pagination;

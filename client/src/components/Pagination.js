import React from 'react';
import { Pagination as PaginationSUI } from 'semantic-ui-react';
import '../styles/Pagination.css';
import useMedia, { mobileMediaQuery } from '../utils/hooks/useMedia';

function Pagination({
    activePage,
    totalPages,
    onPageChange,
    topPadded = false,
    bottomPadded = false,
    disabled = false
}) {
    const isMobile = useMedia(mobileMediaQuery);

    if (totalPages === null || totalPages === 1 || activePage > totalPages) {
        return null;
    }

    let className = 'Pagination';

    if (topPadded) {
        className += ' Pagination--top-padded';
    }

    if (bottomPadded) {
        className += ' Pagination--bottom-padded';
    }

    return (
        <div className={className}>
            <PaginationSUI
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                siblingRange={isMobile ? 0 : 2}
                boundaryRange={isMobile ? 1 : 2}
                firstItem={null}
                lastItem={null}
                disabled={disabled}
            />
        </div>
    );
}

export default Pagination;

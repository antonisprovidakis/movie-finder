import React from 'react';
import { Pagination as PaginationSUI } from 'semantic-ui-react';
import '../styles/Pagination.css';
import useMedia, { mobileMediaQuery } from '../utils/hooks/useMedia';
import concatClasses from '../utils/concatClasses';

function Pagination({
    activePage,
    totalPages,
    onPageChange,
    topPadded = false,
    bottomPadded = false,
    disabled = false
}) {
    const isMobile = useMedia(mobileMediaQuery);

    if (!totalPages) {
        return null;
    }

    const className = concatClasses([
        'Pagination',
        topPadded ? 'Pagination--top-padded' : '',
        bottomPadded ? 'Pagination--bottom-padded' : '',
    ]);

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

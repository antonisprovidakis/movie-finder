import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Pagination.css';
import { Pagination as PaginationSUI } from 'semantic-ui-react';
import concatClasses from '../utils/concatClasses';
import useMedia, { mobileMediaQuery } from '../utils/hooks/useMedia';

function Pagination({
    activePage,
    totalPages,
    onPageChange,
    topPadded,
    bottomPadded,
    disabled
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

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
    topPadded: PropTypes.bool,
    bottomPadded: PropTypes.bool,
    disabled: PropTypes.bool
}

Pagination.defaultProps = {
    onPageChange: () => { },
    topPadded: false,
    bottomPadded: false,
    disabled: false
}

export default Pagination;

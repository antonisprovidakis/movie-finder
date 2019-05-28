import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Icon } from 'semantic-ui-react';

function Rating({ value }) {
    return (
        <div className='Rating'>
            <Icon
                className='Rating__icon'
                name='star'
                color='yellow'
            />
            <span className='Rating__value'>{value}</span>
        </div>
    );
}

Rating.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ])
}

Rating.defaultProps = {
    value: 'NR'
}

export default Rating;

import React from 'react';
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

export default Rating;

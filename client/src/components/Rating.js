import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Icon } from 'semantic-ui-react';

const NO_RATING_VALUE = 'N/R';

function Rating({ value }) {
  return (
    <div className="Rating">
      <Icon className="Rating__icon" name="star" color="yellow" />
      <span className="Rating__value">
        {value !== undefined ? value : NO_RATING_VALUE}
      </span>
    </div>
  );
}

Rating.propTypes = {
  value: PropTypes.number
};

export default Rating;

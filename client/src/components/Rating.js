import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Icon } from 'semantic-ui-react';

const NO_RATING_MESSAGE = 'N/R';

function Rating({ value }) {
  return (
    <div className="Rating">
      <Icon className="Rating__icon" name="star" color="yellow" />
      <span className="Rating__value">
        {value === -1 ? NO_RATING_MESSAGE : value}
      </span>
    </div>
  );
}

Rating.propTypes = {
  value: PropTypes.number
};

Rating.defaultProps = {
  value: -1
};

export default Rating;

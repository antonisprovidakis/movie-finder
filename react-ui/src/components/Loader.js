import React from 'react';
import PropTypes from 'prop-types';
import { Loader as LoaderSUI } from 'semantic-ui-react';

function Loader({ text }) {
  return (
    <LoaderSUI className="Loader" active inline="centered">
      {text}
    </LoaderSUI>
  );
}

Loader.propTypes = {
  text: PropTypes.string
};

Loader.defaultProps = {
  text: ''
};

export default Loader;

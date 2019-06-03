module.exports = function(error, req, res, next) {
  // logger.error(error);
  console.error(error);

  const response = error.response;
  if (!response) {
    return res.status(500).json({
      error: { message: 'Internal Server Error' }
    });
  }

  // see: https://www.themoviedb.org/documentation/api/status-codes
  const {
    status_code: tmdbAPIStatusCode,
    status_message: tmdbAPIStatusMessage,
    errors
  } = response.data;

  const message =
    typeof tmdbAPIStatusCode !== 'undefined' ? tmdbAPIStatusMessage : errors[0];

  return res.status(response.status).json({
    error: {
      code: tmdbAPIStatusCode,
      message
    }
  });
};

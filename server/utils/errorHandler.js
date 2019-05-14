module.exports = function (error, req, res, next) {
    // logger.error(error);
    console.error(error);

    const response = error.response;
    if (!response) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    const data = response.data;
    // const status = response.status;
    // const code = data.status_code;
    // const message = data.status_message;
    // const success = data.success;
    // const errors = data.errors;
    const errorMessage = data.status_message
        ? data.status_message
        : capitalizeString(data.errors[0]);
    res.status(response.status).json({ error: errorMessage });
}

function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

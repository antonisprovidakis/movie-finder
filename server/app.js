require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {
    movieRoutes,
    personRoutes,
    searchRoutes,
    configurationRoutes,
} = require("./routes");

app.use("/", [
    movieRoutes,
    personRoutes,
    searchRoutes,
    configurationRoutes,
]);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
else {
    app.get('*', function (req, res) {
        res.send('Server is used only as an API server in dev mode.');
    });
}

app.use((error, req, res, next) => {
    // logger.error(error);
    console.error(error);

    const response = error.response;
    let errors;

    if (response) {
        if (response.body.status_message !== undefined) {
            errors = [response.body.status_message];
        } else if (response.body.errors) {
            errors = response.body.errors.map(error => error.charAt(0).toUpperCase() + error.slice(1));
        }
    }

    res.status(error.status || 500).json({ errors: errors || ['Internal server error.'] });
});

module.exports = app;

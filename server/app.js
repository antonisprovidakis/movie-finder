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

const errorHandler = require("./utils/errorHandler");

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

app.use(errorHandler);

module.exports = app;

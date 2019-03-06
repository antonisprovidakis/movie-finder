require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const { movieRoutes, personRoutes } = require("./routes");

app.use("/", [
    movieRoutes,
    personRoutes
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
    res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;

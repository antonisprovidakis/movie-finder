const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

const isInProduction = process.env.NODE_ENV === 'production';

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
  res.json({data: 'hello world'});
});

if (isInProduction) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
else {
  app.get('*', function(req, res) {
    res.send('Server is used only as an API server in dev mode.');
  });
}

app.listen(port, ()=> console.log(`Server started on port: ${port}`));

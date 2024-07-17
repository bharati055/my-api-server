const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
const port = process.env.PORT || 8080;

// Middleware for Basic Authentication
const auth = (req, res, next) => {
  const user = basicAuth(req);
  const username = 'admin'; // Replace with your desired username
  const password = 'password'; // Replace with your desired password

  if (user && user.name === username && user.pass === password) {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Authentication required.');
  }
};

// Apply authentication middleware to all routes
app.use(auth);

// Sample route to get data
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello, authenticated user!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

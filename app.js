 


const express = require('express');
const bodyParser = require('body-parser');
const { createConnection } = require('typeorm');
const jwt = require('jsonwebtoken');
const User = require('./src/entities/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connecting to the PostgreSQL database
createConnection()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


  // Include user and auth routes
app.use('/api', require('./src/routes/userRoutes'));
app.use('/api', require('./src/routes/authRoutes'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

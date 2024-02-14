const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 25060;

const db = mysql.createConnection({
  host: 'sharearidedevdb-do-user-2115459-0.b.db.ondigitalocean.com',
  user: 'sharearideDev',
  password: 'AVNS_R0G0KAiXVvtnRxRGKME',
  database: 'sharearideQA',
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(express.json());

// API endpoint to get all users
app.get('/users', (req, res) => {
  // Use a simple query to select all data from the "users" table
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Log the results to the console
      console.log(results);
      // Send the results as JSON response
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

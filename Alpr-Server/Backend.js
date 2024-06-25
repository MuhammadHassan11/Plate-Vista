const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3210;

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hassan@786",
  database: "numberplate"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

app.post('/', (req, res) => {
  try {
    const { number } = req.body;

    // Make sure your table name is correct (it's often case-sensitive)
    const sql = `INSERT INTO \`my-table\` (id, numberplate) VALUES (1, '${number}')`;


    con.query(sql, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err.message);
        res.status(500).json({ error: 'Error inserting data into MySQL' });
      } else {
        console.log("Data inserted into MySQL successfully");
        res.json({ message: 'Data inserted into MySQL successfully' });
      }
    });
  } catch (error) {
    console.error('Error handling POST request:', error.message);
    res.status(500).json({ error: 'Error handling POST request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

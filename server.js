const express = require("express");
const app = express();
const port = 3003;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rootpassword_",
  database: "countriesdatabase",
  port: 3306,
});

/* To test if the database is connected to node

// db.connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("Connected!");
//   }
// });

*/

/* Test if you can Insert to the database


// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO countries (countriesName, population) VALUES ('Hungary', '25048534');";
//   db.query(sqlInsert, (err, result) => {
//     if (err) throw err;
//     res.send("Hello World! YYyfb");
//   });
// });
*/

// APP . use Expressions
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM countries ";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// Insert Items into the database
app.post("/api/insert", (req, res) => {
  const countriesName = req.body.countriesName;
  const population = req.body.population;

  const sqlInsert =
    "INSERT INTO countries (countriesName, population) VALUES (?,?) ";
  db.query(sqlInsert, [countriesName, population], (err, result) => {
    console.log(err);
  });
});

/// Expression to Delete from the database
app.delete("/api/delete/:countriesName", (req, res) => {
  const nameOfCountry = req.params.countriesName;
  const sqlDelete = "DELETE FROM countries WHERE  countriesName = ? ";

  db.query(sqlDelete, nameOfCountry, (err, result) => {
    if (err) console.log(err);
  });
});

/// Expression to Update from the database
app.put("/api/update", (req, res) => {
  const nameOfCountry = req.body.countriesName;
  const populationOfCountry = req.body.population;
  const sqlUpdate =
    "UPDATE countries SET population = ? WHERE countriesName = ?";

  db.query(sqlUpdate, [populationOfCountry, nameOfCountry], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});

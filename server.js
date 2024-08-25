const express = require("express");
const app = express();
const compression = require("compression");
const fs = require("fs");
const csv = require("csv-parser");

// gzip
app.use(compression());
// config CORSS
app.use((req, res, next) => {
  res.header("Access-control-Allow-origin", "*");
  res.header("Access-control-Allow-Header", "content-type");
  res.header("Access-control-Allow-Methods", "*");
  next();
});
// api
app.get("/csv", async (req, res) => {
  const fileStream = fs.createReadStream("Mobile_Food_Facility_Permit.csv");
  const result = [];
  fileStream
    .pipe(csv())
    .on("data", (row) => result.push(row))
    .on("end", () => {
      res.json(result);
    })
    .on("error", (error) => {
      console.error(error.message);
      res.status(500).send("Error reading the file.");
    });
});
app.listen(3001, function () {
  console.log("app listening on port 3001!\n");
});

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const fs = require("fs");
const csv = require("csv-parser");

const config = require("./webpack.config.js");
const compiler = webpack(config);

// use webpack-dev-middleware
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
// app.use((req, res, next) => {
//   res.header("Access-control-Allow-origin", "*");
//   res.header("Access-control-Allow-Header", "content-type");
//   res.header("Access-control-Allow-Methods", "*");
//   next();
// });
app.get("/csv", (req, res) => {
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
  console.log("Example app listening on port 3001!\n");
});

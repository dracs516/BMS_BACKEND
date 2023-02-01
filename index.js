const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const config = require("./database");
const routeuser = require("./routeuser");
const routecomplaint = require("./routecomplaint");
const bodyParser = require("body-parser");

const connection = mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (connection) {
  console.log("database connected");
} else {
  console.log("database connection error");
}

//request read as json
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/user", routeuser);
app.use("/complaint", routecomplaint);

app.get("/", function (req, res) {
  res.end("hello world");
});
app.listen(process.env.PORT || port, function () {
  console.log("server is " + port);
});

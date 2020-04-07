var express = require("express");
var cors = require("cors");
var path = require("path");

var templateRouter = require("./routes/template");
var mockupRouter = require("./routes/mockup");
var exampleRouter = require("./routes/example");

var app = express();

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/templates", templateRouter);
app.use("/api/mockups", mockupRouter);
app.use("/api/examples", exampleRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + `/client/build/index.html`));
});

const port = process.env.PORT || 4000;
app.listen(port);

module.exports = app;

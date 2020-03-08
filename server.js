const express = require("express");
const path = require("path");
const friends = require("./app/data/friends.js");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));

// TODO: figure out
// const apiRoutes = require("./app/routing/apiRoutes.js");
// const htmlRoutes = require("./app/routing/htmlRoutes.js");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/app/public/", "home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname + "/app/public/", "survey.html"));
});

app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

app.post("/api/friends", function (req, res) {
    res.sendFile(path.join(__dirname + "/html/", "survey.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
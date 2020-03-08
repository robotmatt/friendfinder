const express = require("express");
const path = require("path");
const friends = require("./app/data/friends.js");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
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

    let response = req.body;
    let scores = []
    friends.forEach((friend, friendIndex) => {
        let sum = 0;
        friend.scores.forEach((friendScore, scoreIndex) => {
            // TODO: Make positive
            sum += friendScore - response.scores[scoreIndex];
            //console.log(sum);
        });
        scores.push([{
            "index": friendIndex,
            "value": sum
        }]);
    });

    // figure out the closest match
    scores.sort((a, b) => a[0].value - b[0].value);
    // scores[0] now has the index of the closest match;
    // TODO: Return closests match
    return res.json(friends[scores[0].index]);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
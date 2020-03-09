const express = require("express");
const path = require("path");

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
const apiRoutes = require("./app/routing/apiRoutes.js")(app, path);
const htmlRoutes = require("./app/routing/htmlRoutes.js")(app, path);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
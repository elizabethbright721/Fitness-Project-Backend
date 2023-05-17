const express = require("express");
const cors = require("cors");
const fitnessControllers = require("./controllers/fitnesscontroller.js")
//CONFIGURATION
const app = express();

//MIDDLEWEAR
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the BEST Fitness App!")
});

app.use("/fitness", fitnessControllers);

app.get("*", (req, res) => {
    res.status(404).send("Page not found ")
} )

module.exports = app; 
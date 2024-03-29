const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const morgan = require("morgan");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const { DB_DOCKER_CONFIG } = require("./dbConfig");

const PORT = process.env.PORT || 3001;
const app = express();

const db = knex(DB_DOCKER_CONFIG);

app.use(bodyParser.json());
app.use(morgan('combined'))
app.use(cors());

app.get("/", (req, res) => {
    res.send('SERVER IS UP AND RUNNING :)');
});
app.post("/signin", (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(PORT, async () => {
    console.log(`app is running on port ${PORT}!`);
});

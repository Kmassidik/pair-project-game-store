const express = require("express");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const auth = require('./routes/auth');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(auth)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

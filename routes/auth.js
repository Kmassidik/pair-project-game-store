const express = require('express');
const routes = express.Router()
const { AuthenticationUser } = require('../controllers/authentication');

routes.get("/home", AuthenticationUser.home);
routes.get("/login", AuthenticationUser.getLogin);
routes.post("/login", AuthenticationUser.postLogin);
routes.get("/register", AuthenticationUser.getRegister);
routes.post("/register", AuthenticationUser.postRegister);
routes.get("/logout", AuthenticationUser.logout);

module.exports = routes
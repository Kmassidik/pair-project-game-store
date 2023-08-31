const express = require('express')
const session = require('express-session');
require('dotenv').config(); 

const { Register } = require('./controllers/register')
const { Login } = require('./controllers/login')
const { Logout } = require('./controllers/logout')

const app = express()
const port = 3000

app.set('view engine', 'ejs') 
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',Login.getLogin)
app.post('/login',Login.postLogin)

app.get('/register',Register.getRegister)
app.post('/register',Register.postRegister)

app.get('/home',Login.home)
app.get('/logout',Logout.logout)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
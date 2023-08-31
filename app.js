const express = require('express')
const { Register } = require('./controllers/register')
const { Login } = require('./controllers/login')
const app = express()
const port = 3000

app.set('view engine', 'ejs') 
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',Login.getLogin)
app.post('/login',Login.postLogin)

app.get('/register',Register.getRegister)
app.post('/register',Register.postRegister)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
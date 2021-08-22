const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = process.env.PORT || 3000

const db = require('./models')
const User = db.User
const Todo = db.Todo

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Index page
app.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})


app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  console.log(name)
  console.log(email)
  console.log(password)

  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

app.get('todos/new', (req, res) => {
  res.render('new')
})

app.get('todos/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
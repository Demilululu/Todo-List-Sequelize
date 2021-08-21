const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

app.get('/login', (req, res) => {
  app.render('login')
})

app.get('/register', (req, res) => {
  app.render('register')
})

app.get('/', (req, res) => {
  app.render('index')
})

app.get('/new', (req, res) => {
  app.render('new')
})

app.get('/edit', (req, res) => {
  app.render('edit')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
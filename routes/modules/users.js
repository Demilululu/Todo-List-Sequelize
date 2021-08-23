const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const router = express.Router()

const db = require('../../models')
const User = db.User
const Todo = db.Todo


// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // check email 
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name, email, password, confirmPassword
        })
      }
    })
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      User.create({ name, email, password: hash })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
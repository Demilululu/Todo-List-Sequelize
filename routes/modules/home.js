const express = require('express')
const router = express.Router()

const db = require('../../models')
const User = db.User
const Todo = db.Todo


// Index page
router.get('/', (req, res) => {
  const UserId = req.user.id

  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId }
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})


module.exports = router
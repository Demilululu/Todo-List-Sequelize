const express = require('express')
const router = express.Router()

const db = require('../../models')
const User = db.User
const Todo = db.Todo


// Detail page
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})


// New Todo
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (res, req) => {
  const name = req.body.name
  const UserId = req.user.id
  
  return Todo.create({name, UserId})
  .then(()=> res.direct('/'))
  .catch(error => console.log(error))
})

// Edit Todo
router.get('/edit', (req, res) => {
  res.render('edit')
})

//Delete Todo






module.exports = router
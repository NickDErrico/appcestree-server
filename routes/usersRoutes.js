const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('users')
    .select()
    .orderBy('id', 'asc')
    .then(users => res.json(users))
});

router.get('/:id', function(req, res) {
  knex('users')
    .select()
    .where('id', req.params.id)
    .then(user => res.json(user))
});

router.post('/', function(req, res) {
  knex('users')
    .insert(req.body, '*')
    .then(newUser => res.json(newUser))
});

router.patch('/:id', function(req, res) {
  knex('users')
    .update(req.body)
    .where('id', req.params.id)
    .returning('*')
    .then(updatedUser => res.json(updatedUser))
});

router.delete('/:id', function(req, res) {
  knex('users')
    .del()
    .where('id', req.params.id)
    .then(removedUser => removedUser)
});

module.exports = router

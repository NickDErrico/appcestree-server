const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('projects')
    .select()
    .orderBy('id', 'asc')
    .then(projects => res.json(projects))
})

router.get('/:id', function(req, res) {
  knex('projects')
    .select()
    .where('id', req.params.id)
    .then(project => res.json(project))
})

router.post('/', function(req, res) {
  knex('projects')
    .insert(req.body, '*')
    .then(newProject => res.json(newProject))
})

router.patch('/:id', function(req, res) {
  knex('projects')
    .update(req.body)
    .where('id', req.params.id)
    .returning('*')
    .then(updatedProject => res.json(updatedProject))
})

router.delete('/:id', function(req, res) {
  knex('projects')
    .del()
    .where('id', req.params.id)
    .then(removedProject => removedProject)
})

module.exports = router

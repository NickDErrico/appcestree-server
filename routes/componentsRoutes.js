const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('components')
    .select()
    .orderBy('id', 'asc')
    .then(components => res.json(components))
})

router.get('/:id', function(req, res) {
  knex('components')
    .select()
    .where('id', req.params.id)
    .then(component => res.json(component))
})

router.post('/', function(req, res) {
  knex('components')
    .insert(req.body, '*')
    .then(newComponent => {
      knex('parent_child_component')
        .insert({
          parent_id: req.body.parent_id,
          child_id: newComponent.id
        })
        .then(() => res.send(newComponent))
    })
})

router.patch('/:id', function(req, res) {
  knex('components')
    .update(req.body)
    .where('id', req.params.id)
    .returning('*')
    .then(updatedComponent => res.json(updatedComponent))
})

router.delete('/:id', function(req, res) {
  knex('components')
    .del()
    .where('id', req.params.id)
    .then(removedProject => removedProject)
})

module.exports = router

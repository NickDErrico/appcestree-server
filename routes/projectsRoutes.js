const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('projects')
    .select()
    .orderBy('id', 'asc')
    .then(projects => res.json(projects))
})

router.get('/:id', function(req, res) {
  knex('projects')
    .where('id', req.params.id)
    .then(project => {
      knex('components')
        .where('project_id', req.params.id)
        .then(results => {
          knex('parent_child_component')
            .select('components.*', 'parent_child_component.child_id', 'parent_child_component.parent_id')
            .innerJoin('components', 'parent_child_component.child_id', 'components.id')
            .then(components => {
              const doingstuff = (arr) => {

              }
              res.json({
                project,
                components
              })
            })
        })
    })

/*
{
  projectDetails: {
    ...
  },
  components: {
    app: {
      name: '...',
      componentDetails,
      children: [
        {
          name: '...',
          componentDetails,
          children: [...]
        }
      ]
    }
  }
}
*/

  // knex('projects')
  //   .select()
  //   .where('id', req.params.id)
  //   .then(project => {
  //     knex('parent_child_component')
  //       .where('parent_id', req.params.id)
  //       .orWhere('child_id', req.params.id)
  //       .select('components.*', 'parent_child_component.id', 'parent_child_component.parent_id')
  //       .innerJoin('components', 'parent_child_component.child_id', 'components.id')
  //       .then(results => {
  //         res.json({ project, components: results })
  //       })
  //   })
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

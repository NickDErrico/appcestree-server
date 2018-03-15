const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('projects')
    .select()
    .orderBy('id', 'asc')
    .then(projects => res.json(projects))
});

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
            .then(baseComponents => {
              function alterDataTree(baseComponents) {
                const properDataStructure = baseComponents.map(component => {
                    component.children = [];
                })

                function topLevel(components, indx){
                  if(components[indx].parent_id){
                    botLevel(components, 0);
                    components.splice(indx,1);
                    indx--;
                  }
                  if(indx == components.length-1){
                    return components;
                  }

                  return topLevel(components, indx+1);


                  function botLevel(curArr, i){
                    if(i==curArr.length){
                      return;
                    }
                    if(curArr[i].id == components[indx].parent_id){
                      curArr[i].children.push(components[indx]);
                      return;
                    }

                    if(curArr[i].children.length>0){
                      botLevel(curArr[i].children,0);
                    }
                    botLevel(curArr, i+1);
                  }
                }

                return topLevel(baseComponents, 0);
              }
              let returnData = alterDataTree(baseComponents)
              res.json({
                returnData
              })
            })
        })
    })
});
router.post('/', function(req, res) {
  knex('projects')
    .insert(req.body, '*')
    .then(newProject => res.json(newProject))
});

router.patch('/:id', function(req, res) {
  knex('projects')
    .update(req.body)
    .where('id', req.params.id)
    .returning('*')
    .then(updatedProject => res.json(updatedProject))
});

router.delete('/:id', function(req, res) {
  knex('projects')
    .del()
    .where('id', req.params.id)
    .then(removedProject => removedProject)
});

module.exports = router

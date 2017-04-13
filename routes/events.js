'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')



///////// Routes /////////
router.get('/', showAllEvents)
router.get('/:id', showSpecificEvent)
router.get('/:id/register')


///////// Routing Functions /////////
function showAllEvents(req,res,next){
  return knex('events')
    .then((events) => {
      res.render('events/events', {events})
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

function showSpecificEvent(req,res,next){
  const id = req.params.id
  return knex('events')
    .where({id}).first()
    .then((event) => {
      res.render('events/individualEvent', {event})
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
}

function registerForEvent(req,res,next){
  const id = req.params.id
}



module.exports = router

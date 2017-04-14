'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')


///////// Routes /////////
router.get('/', showAllAttendees)
router.get('/:id', showSpecificAttendee)



///////// Routing Functions /////////
function showAllAttendees(req,res,next){
  return knex('attendees')
    .then((attendee) => res.render('attendees',{attendee}))
    .catch((err) => next(err))
}

function showSpecificAttendee(req,res,next){
  const id = req.params.id
  return knex('attendees')
    .where({id}).first()
    .then((attendee) => res.render('attendees/individualAttendee',{attendee}))
    .catch((err) => next(err))
}

//adding the join to the events being attended
//
// function showSpecificAttendee(req,res,next){
//   const id = req.params.id
//
//   return knex.select('attendee.id, attendee.preferred_name, attendee.email, ticket_id,')
//     .from()
//     .where({id}).first()
//     .then((attendee) => res.render('attendees/individualAttendee',{attendee}))
//     .catch((err) => next(err))
// }





module.exports = router

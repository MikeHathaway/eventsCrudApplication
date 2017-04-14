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


//adding the join to the events being attended
function showSpecificAttendee(req,res,next){
  const id = parseInt(req.params.id)

  return knex.select('attendees.preferred_name', 'attendees.email', 'events.title', 'events.start_datetime', 'events.end_datetime')
    .from('attendees')
    .innerJoin('attendee_tickets', 'attendees.id', 'attendee_tickets.attendee_id')
    .innerJoin('tickets', 'attendee_tickets.ticket_id', 'tickets.id')
    .innerJoin('events', 'tickets.events_id', 'events.id')
    .where('attendees.id', id)
    .then((attendee) => {
      res.render('attendees/individualAttendee',{attendee})
    })
    .catch((err) => next(err))
}





module.exports = router

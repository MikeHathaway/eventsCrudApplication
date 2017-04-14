'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')

//http://stackoverflow.com/questions/39631240/query-multiple-tables-with-knex-js

///////// Routes /////////
router.get('/', showAllEvents)
router.get('/:id', showSpecificEvent)

router.get('/:id/attendees', viewEventAttendees)

router.get('/:id/register', viewEventRegistration)
router.post('/:id/register',registerAttendee)


///////// Routing Functions /////////
function showAllEvents(req,res,next){
  return knex('events')
    .then((events) => res.render('events/events', {events}))
    .catch((err) => next(err))
}

function showSpecificEvent(req,res,next){
  const id = req.params.id
  return knex('events')
    .where({id}).first()
    .then((event) => res.render('events/individualEvent', {event}))
    .catch((err) => next(err))
}

function viewEventRegistration(req,res,next){
  const id = req.params.id

  return knex('tickets')
    .then((tickets) => {
      res.render('events/eventRegistration', {
        tickets: tickets, //getUniqueTicketTypes(tickets)
        event: {id}
      })
    })
    .catch((err) => next(err))
}


function viewEventAttendees(req,res,next){
  const id = req.params.id
  return knex.select('*')
    .from('events')
    .then((event) => {
      knex.select('*')
        .from('attendees')
        .where({id})
        .then((attendee) => {
          console.log(attendee)
          res.render('attendees', {
            attendee: attendee,
            event: event
          })
        })
    })
    .catch((err) => next(err))
}



function registerAttendee(req,res,next){
  const {birthday,email,last_name, preferred_name} = req.body
  const newAttendee = {birthday,email,last_name, preferred_name}
  const ticket_id = parseInt(req.body.id)
  console.log(req.body)

  return knex('attendees')
    .where({ email: newAttendee.email })
      .then((attendees) => {
        return !attendees[0] ? knex('attendees').insert(newAttendee) : attendees
      })
      .then(([attendee]) => {
        return knex('attendee_tickets').insert({ticket_id: ticket_id, attendee_id: attendee.id})
      })
      .then((attendee) => {
        attendee = attendee.length > 0 ? attendee : newAttendee
        return res.render('attendees/individualAttendee',{attendee})
      })
    .catch((err) => next(err))
}




///////// Utility Functions /////////
  //this function is broken
function getUniqueTicketTypes(tickets){
  const ticketTypes = []

  tickets.forEach(ticket => {
    const newObj = {}
    if(Object.values(newObj).indexOf(ticket.name) === -1){
      newObj['price'] = ticket.price
      newObj['name'] = ticket.name
      ticketTypes.push(newObj)
    }
  })
  return ticketTypes
}



module.exports = router

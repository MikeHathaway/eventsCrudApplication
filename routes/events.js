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
      res.render('events/eventRegistration',{
        tickets: getUniqueTicketTypes(tickets)
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
}



function registerAttendee(req,res,next){
  const newAttendeeData = req.body

  return knex
    .from('attendees')
    .insert(newAttendeeData)
    .then()

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
  console.log(ticketTypes)
  return ticketTypes
}



module.exports = router

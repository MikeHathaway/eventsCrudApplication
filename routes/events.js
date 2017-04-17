'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')


///////// Routes /////////
router.get('/', showAllEvents)

router.get('/new', showEventRegistration)
router.post('/new', registerEvent)

router.get('/:id', showSpecificEvent)

router.get('/:id/attendees', viewEventAttendees)

router.get('/:id/register', viewEventRegistration)
router.post('/:id/register',registerAttendee)


///////// Routing Functions /////////
function showAllEvents(req,res,next){
  return retreiveEventInformation()
    .then((events) => res.render('events', {events}))
    .catch((err) => next(err))
}

function showEventRegistration(req,res,next){
  res.render('events/new',{hey:'hey'})
}

function registerEvent(req,res,next){
  const newEvent = req.body
  return knex('events')
    .insert(newEvent)
    .then((event) => res.render('events/individualEvent', {event}))
    .catch((err) => next(err))
}

function showSpecificEvent(req,res,next){
  const id = req.params.id
  return retreiveEventInformation(id)
    .then((event) => res.render('events/individualEvent', {event}))
    .catch((err) => next(err))

}

function viewEventRegistration(req,res,next){
  const id = req.params.id
  return retreiveEventInformation(id)
    .then((event) => res.render('events/eventRegistration',{event}))
    .catch((err) => next(err))
}

function viewEventAttendees(req,res,next){
  const id = req.params.id
  return knex.select('*')
    .from('events')
    .where({id})
    .then((event) => {
      knex.select('*')
        .from('attendees')
        .where({id})
        .then((attendee) => {
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
  const ticket_id = 2//parseInt(req.body.id)
  const error = {message: 'You must be over 21 to attended this event.'}

  return knex('attendees')
    .where({ email: newAttendee.email })
      .then((attendees) => {
        console.log('!',attendees)
        return !attendees[0] ? knex('attendees').insert(newAttendee) : attendees
      })
      .then(([attendee]) => {
        console.log('error here?')
        return knex('attendee_tickets').insert({ticket_id: ticket_id, attendee_id: attendee.id})
      })
      .then((attendee) => {
        // console.log('ABOVE',attendee, attendeeOver21(attendee))
        attendee = attendee.length > 0 ? attendee : newAttendee
        console.log(attendee, attendeeOver21(attendee))
        return attendeeOver21(attendee) ? res.render('attendees/newAttendee',{attendee}) : res.render('events/eventRegistration',{error})
      })
    .catch((err) => next(err))
}




///////// Utility Functions /////////
function retreiveEventInformation(id){
  return id ? retreivalCriterion().where('events.id',id).first() : retreivalCriterion()
}

function retreivalCriterion(){
  return knex.select('tickets.name', 'tickets.price', 'events.id', 'events.title', 'events.description', 'events.start_datetime', 'events.end_datetime', 'events.over_21', 'events.venues_id', 'venues.venue_name', 'venues.capacity', 'venues.line_1', 'venues.city', 'venues.state', 'venues.zip')
    .from('tickets')
    .innerJoin('events', 'tickets.events_id', 'events.id')
    .innerJoin('venues', 'events.venues_id', 'venues.id')
}

function attendeeOver21(attendeeInfo){
  console.log(attendeeInfo)
  const birthYear = parseInt(attendeeInfo.birthday.split('').slice(0,5).join(''))
  const currentYear = new Date().getFullYear()
  return (currentYear - birthYear < 21) ? false : true
}


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

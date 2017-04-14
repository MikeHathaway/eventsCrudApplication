'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')

//http://stackoverflow.com/questions/39631240/query-multiple-tables-with-knex-js

///////// Routes /////////
router.get('/', showAllEvents)
router.get('/:id', showSpecificEvent)
router.get('/:id/register',viewEventRegistration)

router.post('/:id/register',registerForEvent)

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

function viewEventRegistration(req,res,next){
  const id = req.params.id
  let eventToRegister
  let ticketTypes

  knex('events')
    .where({id})
    .then((event) => {
      eventToRegister = event
    })

  knex('tickets')
    .then((tickets) => {
      ticketTypes = getUniqueTicketTypes(tickets)
    })
    .then(() => {
      res.render('events/eventRegistration', {
        event: eventToRegister,
        ticketTypes: ticketTypes
      })
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
}


function registerForEvent(req,res,next){

}


///////// Utility Functions /////////
function getUniqueTicketTypes(tickets){
  const ticketTypes = []

  tickets.forEach(ticket => {
    const newObj = {}
    if(Object.values(newObj).indexOf(ticket.name) === -1){
      newObj['price'] = ticket.price
      newObj['name'] = ticket.name
      console.log('h,mm')
      ticketTypes.push(newObj)
    }
  })
  console.log(ticketTypes)
  return ticketTypes
}



module.exports = router

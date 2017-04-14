'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')


///////// Routes /////////
router.get('/', showAllAttendees)
router.get('/:id', showSpecificAttendee)
router.post('/:id/register',registerAttendee)



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
    .then((attendee) => res.render('attendees',{attendee}))
    .catch((err) => next(err))
}

function registerAttendee(req,res,next){
  const newAttendeeData = req.body

  return knex('attendees')
    .insert(newAttendeeData)
    .then((attendee) => {
      res.redirect(`/attendees/${attendee.id}`)
    })
    .catch((err) => next(err))
}

module.exports = router

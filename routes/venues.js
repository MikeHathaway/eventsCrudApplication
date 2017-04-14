'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')



///////// Routes /////////
router.get('/', showAllVenues)
router.get('/:id', showVenueEvents)


///////// Routing Functions /////////
function showAllVenues(req,res,next){
  return knex('venues')
    .then((venue) => res.render('venues', {venue}))
    .catch((err) => next(err))
}

function showVenueEvents(req,res,next){
  const id = req.params.id

  return knex.select('venues.name', 'events.start_datetime', 'events.title', 'events.id')
    .from('venues')
    .innerJoin('events','venues.id','events.venues_id')
    .where('venues.id', id)
    .then((venue) => {
      console.log(venue)
      res.render('venues/venueEvents', {venue}) //need to sort venueEvents by start_datetime
    })
}


///////// Utility Functions /////////
function sortVenuesByStart(venue){

}



module.exports = router

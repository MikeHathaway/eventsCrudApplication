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

  return knex.select('venues.name', 'events.start_datetime', 'events.end_datetime', 'events.title', 'events.id')
    .from('venues')
    .innerJoin('events','venues.id','events.venues_id')
    .where('venues.id', id)
    .then((venue) => {
      const sortedVenue = sortVenuesByStart(venue)
      venue = sortedVenue
      res.render('venues/venueEvents', {venue})
    })
    .catch((err) => next(err))
}


///////// Utility Functions /////////
function sortVenuesByStart(venue){
  return venue.sort(sortCriterion)
}

function sortCriterion(a,b){
  if(a.start_datetime < b.start_datetime){
    return -1
  }
  else if(a.start_datetime > b.start_datetime){
    return 1
  }
  return 0
}



module.exports = router

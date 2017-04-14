'use strict'

///////// Global Variables /////////
const express = require('express')
const router = express.Router()
const knex = require('../db/knex.js')



///////// Routes /////////
router.get('/', showAllVenues)
router.get('/:id')


///////// Routing Functions /////////
function showAllVenues(req,res,next){
  return knex('venues')
    .then((venue) => res.render('venues', {venue}))
    .catch((err) => next(err))
}

module.exports = router

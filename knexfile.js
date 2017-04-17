'use strict'

const password = process.env.PASSWORD
const path = require('path')


module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://mike:${password}@localhost/events_crud`,
    migrations: {
      directory: path.join(__dirname,'db','migrations')
    },
    seeds: {
      directory: path.join(__dirname,'db','seeds')
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname,'db','migrations')
    },
    seeds: {
      directory: path.join(__dirname,'db','seeds')
    }
}

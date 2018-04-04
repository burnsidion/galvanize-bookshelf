'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const humps = require('humps')
// YOUR CODE HERE

router.get('/books', (req, res, next) => {
  knex('books')
    .then((data) => {
      data.sort((a, b) => {
        if (a.title > b.title) {
          return 1
        } else {
          return -1
        }
      })
      res.json(humps.camelizeKeys(data))
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then((data) => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/books', (req, res, next) => {
  knex('books')
  .insert(humps.decamelizeKeys({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }))
  .returning('*')
  .then((data) => {

    res.json(humps.camelizeKeys(data[0]))
  })
  .catch((err) => {
    next(err)
  })
})











module.exports = router;

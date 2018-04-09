'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
const KEY = process.env.JWT_KEY
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// YOUR CODE HERE

router.get('/favorites', (req, res, next) => {
  knex.select('*').from('favorites')
    .leftJoin('books', 'books.id', 'favorites.book_id')
    .then((data) => {
      res.send(humps.camelizeKeys(data))
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/favorites/check?', (req, res, next) => {
  knex('favorites')
    .select('*')
    .where('book_id', req.query.bookId)
    .then(data => {
      if (data.length > 0) {
        res.json(true)
      } else {
        res.json(false)
      }
    })
})

router.post('/favorites', (req, res, next) => {
  knex('favorites')
  .select('*')
    .insert({
      id: req.body.id,
      book_id: req.body.bookId,
      user_id: 1
    })
    .returning('*')
    .then(data => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      next(err)
    })

})

router.delete('/favorites', (req, res, next) => {
  knex('favorites')
  .where('book_id', req.body.bookId)
  .del()
  .returning(['book_id', 'user_id'])
  .then(data => {
    res.json(humps.camelizeKeys(data[0]))

  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router;

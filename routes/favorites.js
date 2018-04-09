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
  if(req.cookies.token){
    knex.select('*').from('favorites')
      .join('books', 'books.id', 'favorites.book_id')
      .then((data) => {
        res.send(humps.camelizeKeys(data))
      })
  } else {
    res.status(401).type('text/plain').send('Unauthorized')
  }


})

router.get('/favorites/check?', (req, res, next) => {
  if (req.cookies.token) {
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
  } else {
    res.status(401).type('text/plain').send('Unauthorized')
  }

})

router.post('/favorites', (req, res, next) => {
  if (req.cookies.token) {
    let token = jwt.decode(req.cookies.token)
    console.log(token.id);
    knex('favorites')
      .select('*')
      .insert({
        id: req.body.id,
        book_id: req.body.bookId,
        user_id: token.id
      })
      .returning('*')
      .then(data => {
        res.json(humps.camelizeKeys(data[0]))
      })

  } else {
    res.status(401).type('text/plain').send('Unauthorized')
  }


})

router.delete('/favorites', (req, res, next) => {
  if (req.cookies.token) {
    knex('favorites')
      .where('book_id', req.body.bookId)
      .del()
      .returning(['book_id', 'user_id'])
      .then(data => {
        res.json(humps.camelizeKeys(data[0]))

      })

  } else {
    res.status(401).type('text/plain').send('Unauthorized')
  }

})


module.exports = router;

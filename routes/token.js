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

router.get('/token', (req, res, next) => {
  if (!req.cookies.token) {
    res.json(false)

  } else {
    res.json(true)
  }
})

router.post('/token', (req, res, next) => {
  knex('users')
  .where('email', req.body.email)
    .then((data) => {
      const user = {
        id: data[0].id,
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        email: data[0].email
      }
      bcrypt.compare(req.body.password, data[0].hashed_password)
      .then((result) => {
        if(result === true && req.body.email === data[0].email){
          let signedUser = jwt.sign(user, KEY)
          res.cookie('token', signedUser, {
              path: '/',
              httpOnly: true
            })
            .json(user)
        } else {
          res.status(400).type('text/plain')
          .send("Bad email or password")

        }

      })
    })
  })
  router.delete('/token', (req, res, next) => {
    res.cookie('token', '')
    .json(true)

  })
  module.exports = router;

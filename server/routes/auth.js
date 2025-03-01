
import express from "express";
const router = express.Router();

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// jsonwebtoken
var jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";

// Mysql
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sidejobdb',
})

// REGISTER
router.post('/register',
  function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, password_hash) {
      connection.execute(
        'INSERT INTO users (phone_number, password, fname, lname) VALUES(?, ?, ?, ?)',
        [req.body.phone_number, password_hash, req.body.fname, req.body.lname],
        // Callback
        function (err, results, fields) {
          if (err) {
            res.json({ status: 'error', message: err })
            return
          }

          var token = jwt.sign({ phone_number: req.body.phone_number }, SECRET_KEY);
          res.json({ message : 'Register Success', token})
        }
      )
    })

  })


// LOGIN
router.post('/login',
    // Callback
  function (req, res, next) {
    connection.execute(
      'SELECT * FROM users WHERE phone_number = ?', [req.body.phone_number],
      // Callback
      function (err, users) {
        if (err) {
          res.json({ message: err })
          return
        }
        if (users.length == 0) {
          res.json({ message: 'No user found' })
          return
        }
        bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ phone_number: users[0].phone_number }, SECRET_KEY)
            res.json({ message: 'Login Success', token })
          }
          else {
            res.json({ message: 'Wrong' })
          }
        });

      }
    )
  })



// Authentication API
router.post('/authentication',
  function (req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, SECRET_KEY);
      res.json({message : 'ok' })
    }
    catch (err) {
      res.json({message : err.message})
    }
    }
  )
  
export default router;

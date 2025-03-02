import express from "express";
import supabase from '../db.js'


const router = express.Router();




// Bcrypt
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10;


// jsonwebtoken
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY;


// Constants
const REGISTER_QUERY = 'INSERT INTO members (phone_number, password, fname, lname) VALUES(?, ?, ?, ?)';
const LOGIN_QUERY = 'SELECT * FROM members WHERE phone_number = ?';


// Helper functions
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}



// REGISTER
router.post('/register',
  async function (req, res, next) {
    const { phone_number, password, fname, lname } = req.body;
    const hashedPassword = await hashPassword(password);

    const { error } = await supabase
      .from('members')
      .insert({ phone_number: phone_number, password: hashedPassword, fname : fname, lname : lname })

      if (error) {
        res.json({ status: 'Failed to create user', message: error })
        return
      }

      var token = jwt.sign({ phone_number: phone_number }, SECRET_KEY);
      res.json({ message: 'Register Success', token })
    }
  )





// LOGIN
router.post('/login',
  // Callback
  function (req, res, next) {
    const { phone_number, password } = req.body;
    connection.execute(
      LOGIN_QUERY, [phone_number],

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
      res.json({ message: 'ok' })
    }
    catch (err) {
      res.json({ message: err.message })
    }
  }
)




export default router;

import express from "express";
import supabase from '../db.js'


const router = express.Router();




// Bcrypt
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10;


// jsonwebtoken
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY;



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
      .insert({ phone_number, password : hashedPassword,  fname, lname })

    if (error) {
      res.json({ status: 'Failed to create user', message: error })
      return
    }

    var token = jwt.sign({ phone_number: phone_number }, SECRET_KEY);
    res.json({ message: 'RegisterSuccess', token })
  }
)





// LOGIN
router.post('/login',
  async function (req, res, next) {
    const { phone_number, password } = req.body;

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('phone_number', phone_number);


      if (error) {
        res.json({ message: error })
        return
      }

      if (data.length == 0) {
        res.json({ message: 'No user found' })
        return
      }

      bcrypt.compare(password, data[0].password, function (err, isLogin) {
        if (isLogin) {
          var token = jwt.sign({ phone_number: data[0].phone_number }, SECRET_KEY)
          res.json({ message: 'Login Success', token })
        }
        else {
          res.json({ message: 'WrongPassword' })
        }
      });

    

  })




// Authentication API
router.post('/authentication',
  function (req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, SECRET_KEY);
      res.json({ message: 'TokenConfirm' })
    }
    catch (err) {
      res.json({ message: err.message })
    }
  }
)




export default router;

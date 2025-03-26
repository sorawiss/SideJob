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
function generateToken(phone_number) {
  return jwt.sign(phone_number, SECRET_KEY);
}




// REGISTER
router.post('/register',
  async (req, res) => {
    const { phone_number, password, fname, lname } = req.body;
    const hashedPassword = await hashPassword(password);

    const { error } = await supabase
      .from('members')
      .insert({ phone_number, password : hashedPassword,  fname, lname })

    if (error) {
      return res.status(500).json({ message: 'Failed to create user', error: error.message });
    }

    const token = generateToken(phone_number)
    res.cookie("AccessToken", token, {
      httpOnly: true,
    })
    res.status(201).json({ message: 'RegisterSuccess'});
  }
)




// LOGIN
router.post('/login',
  async (req, res) => {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
        return res.status(400).json({ message: "Phone number and password are required" });
    }
    
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('phone_number', phone_number)

      if (error) {
        return res.status(500).json({ message: 'Database error', error: error.message });
      }

      if (!data[0]) {
        return res.status(404).json({ message: 'No user found' });
      }

      bcrypt.compare(password, data[0].password, function (err, isLogin) {
        if (isLogin) {
          var token = generateToken(phone_number)
          res.cookie("AccessToken", token, {
            httpOnly: true,
          })

          const { password, ...rest } = data[0]
          res.json({ message: 'Login Success', user : rest })
        }
        else {
          return res.status(401).json({ message: 'IncorrectPassword', error: err })
        }
      })
  })




// Authentication API
router.post('/authentication', (req, res) => {
  try {
      const token = req.cookies.AccessToken
      
      if (!token) {
        return res.status(401).json({ message: 'NoTokenProvided' });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.status(200).json({ message: 'TokenConfirm', user: decoded });
  }
  catch (err) {
    res.status(401).json({ message: 'InvalidToken', error: err.message });
  }
});



// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("AccessToken", {
      httpOnly: true
  });
  res.status(200).json({ message: "LogoutSuccessful" });
});




export default router;
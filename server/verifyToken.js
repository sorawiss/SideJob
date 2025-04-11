import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;


const verifyToken = (req, res, next) => {
    const token = req.cookies.AccessToken;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
  
  export default verifyToken;
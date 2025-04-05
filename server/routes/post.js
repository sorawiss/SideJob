import express from "express";
import jwt from 'jsonwebtoken';
import moment from "moment";

import supabase from '../db.js';


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;


const verifyToken = (req, res, next) => {
  const token = req.cookies.AccessToken;
  console.log("verifyToken running")

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
}


// Get all posts
router.get('/getPosts', verifyToken, async (req, res) => {
  const {category} = req.query
  
  try {
    const { data, error } = await supabase
      .from('workPost')
      .select('*, members!posterID(fname, lname, profile_picture), category!categoryID(name), review(rating), picture(image)')
      .eq('isJob', category)
      .order('postDate', { ascending: false })

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
})



// CreatePost
router.post('/createPost', verifyToken, async (req, res) => {
  try {
    const {
      title,
      salary,
      details,
      categoryID,
      location,
      isJob,
      images,
    } = req.body

    const time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    const posterID = req.user.id

    const { error, data } = await supabase
      .from('workPost')
      .insert(
        {
          title,
          details,
          categoryID,
          posterID,
          salary,
          location,
          isJob,
          postDate: time,
          status: true
        },
      )
      .select('postID')
      .single()

    if ( error) {
      return res.status(500).json({ message: 'Failed to create post in workPost table', error: error.message });
    }

    let pictureToInsert = []

    if (images && images.length > 0) {
      pictureToInsert = images.map((items) => (
        {
          id: data.postID,
          image: items
        }
      ))
    }

    const { error: error2 } = await supabase
      .from('picture')
      .insert(pictureToInsert)

    if (error2) {
      return res.status(500).json({ message: 'Failed to create post in picture table', error: error2.message });
    }

    res.status(201).json({ message: 'Post created successfully' });
  }
  catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message })
  }
})





export default router;

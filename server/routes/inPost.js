import express from "express";

import supabase from '../db.js';



const router = express.Router();


// GetInPost
router.get('/getInPosts/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('workPost')
        .select(`
          *,
          members!posterID(
            fname,
            lname,
            phone_number,
            profile_picture,
            line,
            email
          ),
          category!categoryID(name),
          picture(image),
          accept!inner(
            *,
            members!memberID(
              id,
              fname,
              lname,
              profile_picture,
              phone_number,
              line,
              email
            )
          )
        `)
        .eq('postID', req.params.id)
        .eq('accept.status', true)
        .single()
  
      if (error) {
        return res.status(500).json({ message: 'Failed to fetch inPosts', error: error.message });
      }
  
      res.status(200).json(data);
  
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  })



export default router;
import express from "express";

import supabase from '../db.js';



const router = express.Router();


// GetInPost
router.get('/getInPosts/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('workPost')
        .select('*, members!posterID(fname, lname, phone_number), category!categoryID(name), review(rating), picture(image)')
        .eq('postID', req.params.id)
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
import express from "express";

import supabase from '../db.js';



const router = express.Router();



router.get('/getInPosts', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('workPost')
        .select('*, members!posterID(fname, lname), category!categoryID(name), job(workPlaceAddress), review(rating), picture(image)')
        .eq('postID', req.body.postID)
  
      if (error) {
        return res.status(500).json({ message: 'Failed to fetch inPosts', error: error.message });
      }
  
      res.status(200).json(data);
  
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  })



export default router;
import express from "express";
import supabase from '../db.js';

const router = express.Router();


// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('workPost')
      .select('*, members!posterID(fname, lname), category!categoryID(name), job(workPlaceAddress), review(rating)')

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

export default router;

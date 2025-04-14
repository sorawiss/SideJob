import express from "express";

import supabase from '../db.js';
import verifyToken from "../verifyToken.js";





const router = express.Router();


// Get Individual Profile
router.get('/getProfile/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
          .from('members')
          .select('id, phone_number, fname, lname, birthDate, detail, profile_picture, line, email, workPost!posterID(*, category!categoryID(*), review!postID(*), picture!postID(*))')
          .eq('id', req.params.id)
          .order('postDate', { ascending: false, referencedTable: 'workPost' })
          .single()
    
        if (error) {
          return res.status(500).json({ message: 'Failed to fetch getProfile', error: error.message });
        }
    
        res.status(200).json(data);
    
      } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
      }
})


// Edit profile
router.put('/editProfile', verifyToken, async (req, res) => {
  try { 
    const id = req.user.id
    const update = req.body
    
    
    if (req.user.id !== parseInt(id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }


    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No data to update' }); 
    }

    const { error } = await supabase
      .from('members')
      .update(update)
      .eq('id', id)

    if (error) {
      return res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }

    res.status(200).json({ message: 'Profile updated successfully' })

  }
  catch(err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
})


export default router
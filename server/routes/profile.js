import express from "express";

import supabase from '../db.js';



const router = express.Router();



router.get('/getProfile/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
          .from('members')
          .select('phone_number, fname, lname, birthDate, detail, profile_picture, workPost!posterID(title, salary, status, postDate, details, categoryID)')
          .eq('id', req.params.id)
          .single()
    
        if (error) {
          return res.status(500).json({ message: 'Failed to fetch getProfile', error: error.message });
        }
    
        res.status(200).json(data);
    
      } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
      }
})


export default router
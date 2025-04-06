import express from "express";
import moment from "moment";


import supabase from '../db.js';



const router = express.Router();


// Create Review
router.post('/createReview', async (req, res) => {
    try {
        const {
            postID,
            reviewDetails,
            rating,
            reviewerID,
            reviewedID,
        } = req.body

        const time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

        const { error } = await supabase
            .from('review')
            .insert(
                {
                    postID,
                    reviewDetails,
                    rating,
                    reviewerID,
                    reviewedID,
                    reviewDate: time
                },
            )
        
        if (error) {
            return res.status(500).json({ message: 'Failed to create comment', error: error.message });
        }

        res.status(201).json({ message: 'Revies created successfully' })

    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message })
    }
})



// GetReviews
router.get('/getReviews/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('review')
        .select('*, members!reviewerID(fname, lname) ')
        .eq( 'postID', req.params.id)
        .order('reviewDate', { ascending: false })
        
        if (error) {
          res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
        }
  
        res.status(200).json(data);
      
    }
    catch {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  })



export default router;
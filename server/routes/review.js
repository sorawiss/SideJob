import express from "express";

import supabase from '../db.js';



const router = express.Router();



router.post('/createReview', async (req, res) => {
    try {
        const {
            postID,
            reviewDetails,
            rating,
            reviewerID,
            reviewedID,
        } = req.body


        const { error } = await supabase
            .from('review')
            .insert(
                {
                    postID,
                    reviewDetails,
                    rating,
                    reviewerID,
                    reviewedID,
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



export default router;
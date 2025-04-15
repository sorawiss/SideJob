import express from 'express'
import supabase from '../db'

const router = express.Router()


router.post('/addAccecpt', async (req, res) => {
    try {
        const { postID, memberID } = req.body


        const { error, data } = await supabase
            .from('accept')
            .insert({
                postID,
                memberID
            })
            .select('*')
            .single()

        if (error) {
            return res.status(500).json({ message: 'Failed to create accept(DB)', error: error.message });
        }

        return res.status(201).json({message : 'add to accept successfully', data})
    }
    catch {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})


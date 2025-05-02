import express from 'express'
import supabase from '../db.js'

const router = express.Router()


// Add Accept
router.post('/addAccecpt', async (req, res) => {
    try {
        const { postID, memberID } = req.body


        const { error, data } = await supabase
            .from('accept')
            .insert({
                postID,
                memberID,
                status: false
            })
            .select('*')
            .single()

        if (error) {
            return res.status(500).json({ message: 'Failed to create accept(DB)', error: error.message });
        }

        return res.status(201).json({ message: 'add to accept successfully', data })
    }
    catch {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})


// Get Accept
router.get('/getAccept/:id', async (req, res) => {

    const posterID = req.params.id

    try {
        // Step 1: Get post IDs created by this poster
        const { data: posts, error: error1 } = await supabase
            .from("workPost")
            .select("postID")
            .eq("posterID", posterID);

        if (error1) {
            return res.status(500).json({ message: 'Failed to fetch post(DB)', error: error1.message });
        }

        const validPostIDs = posts?.map((p) => p.postID) ?? [];


        // Step 2: Get accept entries that match those posts
        const { data: acceptData, error } = await supabase
            .from("accept")
            .select("*, members!memberID(id, fname, lname, profile_picture), workPost!postID(postID, title, isJob)")
            .eq("status", false)
            .in("postID", validPostIDs);

        if (error) {
            return res.status(500).json({ message: 'Failed to fetch accept(DB)', error: error.message });
        }

        return res.status(200).json(acceptData)
    }
    catch {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
})


export default router;
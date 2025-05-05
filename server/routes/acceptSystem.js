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


// Change Status
router.patch('/updateAcceptStatus', async (req, res) => {
    try {
        const { postID, memberID } = req.body;

        if (!postID || !memberID) {
            return res.status(400).json({ message: 'Missing postID or memberID in request body' });
        }

        // Optional: Verify the user making the request is the poster of the post
        const { data: postData, error: postError } = await supabase
            .from('workPost')
            .select('posterID')
            .eq('postID', postID)
            .single();

        if (postError) {
            console.error("Error fetching post for verification:", postError);
            return res.status(500).json({ message: 'Failed to verify post ownership', error: postError.message });
        }
        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // if (postData.posterID !== req.user.id) {
        //     return res.status(403).json({ message: 'Forbidden: You are not the owner of this post.' });
        // }


        // Update the status in the accept table
        const { data, error: updateError } = await supabase
            .from('accept')
            .update({ status: true }) // Set status to true
            .eq('postID', postID)
            .eq('memberID', memberID)
            .eq('status', false) // Optional: Ensure we only update if it's currently false
            .select()
            .single();

        if (updateError) {
            console.error("Error updating accept status:", updateError);
            // Handle specific errors like P2025 (Record not found) if needed
            if (updateError.code === 'PGRST116') { // PostgREST code for "Matching row not found"
                 return res.status(404).json({ message: 'Accept record not found or already accepted', error: updateError.message });
            }
            return res.status(500).json({ message: 'Failed to update accept status', error: updateError.message });
        }

        // If the update was successful but didn't find a matching row (e.g., status was already true)
        if (!data) {
             return res.status(404).json({ message: 'Accept record not found or already accepted.' });
        }


        return res.status(200).json({ message: 'Accept status updated successfully', data });

    } catch (err) { // Added err parameter
        console.error("Error in /updateAcceptStatus:", err); // Log the actual error
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

export default router;
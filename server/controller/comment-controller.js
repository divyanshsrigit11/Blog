
// import Comment from '../model/comment.js';


// export const newComment = async (request, response) => {
//     try {
//         const comment = await new Comment(request.body);
//         comment.save();

//         response.status(200).json('Comment saved successfully');
//     } catch (error) {
//         response.status(500).json(error);
//     }
// }


// export const getComments = async (request, response) => {
//     try {
//         const comments = await Comment.find({ postId: request.params.id });
        
//         response.status(200).json(comments);
//     } catch (error) {
//         response.status(500).json(error)
//     }
// }

// export const deleteComment = async (request, response) => {
//     try {
//         const comment = await Comment.findById(request.params.id);
//         await comment.delete()

//         response.status(200).json('Comment deleted successfully');
//     } catch (error) {
//         response.status(500).json(error)
//     }
// }

// controller/comment-controller.js
import Comment from '../model/comment.js';
import mongoose from 'mongoose';

// Create a new comment
export const newComment = async (req, res) => {
    try {
        const { name, postId, date, comments } = req.body;

        // Validation
        if (!name || !postId || !date || !comments) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const newComment = new Comment({
            name,
            postId,
            date,
            comments
        });

        await newComment.save();
        return res.status(201).json({ msg: 'Comment posted successfully' });
    } catch (error) {
        console.error('Error posting comment:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Get all comments for a post
export const getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).json({ msg: 'Post ID is required' });
        }

        const comments = await Comment.find({ postId }).sort({ date: -1 }); // Sort newest first
        return res.status(200).json(comments);
    } catch (error) {
        console.error('Error getting comments:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id.trim();

        console.log("--------------------------------------------------");
        console.log("DELETE REQUEST RECEIVED");
        console.log("ID from params:", id); 
        console.log("Type of ID:", typeof id);
        console.log("Length of ID:", id?.length);
        console.log("Is Valid ObjectId?:", mongoose.Types.ObjectId.isValid(id));
        console.log("--------------------------------------------------");

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: `Invalid comment ID: ${id}` });
        }

        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        return res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};


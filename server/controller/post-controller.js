import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        if (error.name === 'ValidationError') {
             return response.status(400).json({ msg: "Please fill all required fields", error: error.message });
        }
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('Post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(post._id);
        
        if (!post) {
            return response.status(404).json({ msg: 'post not found' });
        }

        await post.delete()

        response.status(200).json('Post deleted successfully');
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

// import mongoose from 'mongoose';
// import Post from '../model/post.js';

// export const createPost = async (request, response) => {
//     try {
//         const post = new Post(request.body);
//         await post.save();
//         response.status(200).json('Post saved successfully');
//     } catch (error) {
//         response.status(500).json({ msg: 'Error creating post', error: error.message });
//     }
// };

// export const updatePost = async (request, response) => {
//     try {
//         const { id } = request.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return response.status(400).json({ msg: 'Invalid post ID format' });
//         }

//         const post = await Post.findById(id);
//         if (!post) {
//             return response.status(404).json({ msg: 'Post not found' });
//         }

//         await Post.findByIdAndUpdate(id, { $set: request.body });
//         response.status(200).json('Post updated successfully');
//     } catch (error) {
//         response.status(500).json({ msg: 'Error updating post', error: error.message });
//     }
// };

// export const deletePost = async (request, response) => {
//     try {
//         const { id } = request.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return response.status(400).json({ msg: 'Invalid post ID format' });
//         }

//         const deletedPost = await Post.findByIdAndDelete(id);
//         if (!deletedPost) {
//             return response.status(404).json({ msg: 'Post not found' });
//         }

//         response.status(200).json('Post deleted successfully');
//     } catch (error) {
//         response.status(500).json({ msg: 'Error deleting post', error: error.message });
//     }
// };

// export const getPost = async (request, response) => {
//     try {
//         const { id } = request.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return response.status(400).json({ msg: 'Invalid post ID format' });
//         }

//         const post = await Post.findById(id);
//         if (!post) {
//             return response.status(404).json({ msg: 'Post not found' });
//         }

//         response.status(200).json(post);
//     } catch (error) {
//         response.status(500).json({ msg: 'Error fetching post', error: error.message });
//     }
// };

// export const getAllPosts = async (request, response) => {
//     const { username, category } = request.query;

//     try {
//         let posts;

//         if (username) {
//             posts = await Post.find({ username });
//         } else if (category) {
//             posts = await Post.find({ categories: category });
//         } else {
//             posts = await Post.find({});
//         }

//         response.status(200).json(posts);
//     } catch (error) {
//         response.status(500).json({ msg: 'Error fetching posts', error: error.message });
//     }
// };

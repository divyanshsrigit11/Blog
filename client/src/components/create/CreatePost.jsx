import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, InputBase, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?auto=format&fit=crop&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                // LOGIC FIX: Don't mutate state directly (post.picture = ...) 
                // Use setPost to trigger the UI update so you see the image
                setPost(prev => ({ ...prev, picture: response.data }));
            }
        }
        getImage();
        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, account.username, location.search])

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box className="editor-container">
            <img src={url} alt="post" className="editor-banner" />

            <Box className="editor-form">
                <label htmlFor="fileInput" className="add-icon-wrapper">
                    <Add fontSize="large" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase 
                    className="editor-title-input" 
                    onChange={handleChange} 
                    name='title' 
                    placeholder="Title" 
                />
                <Button onClick={() => savePost()} className="btn-primary" sx={{px: 4}}>Publish</Button>
            </Box>

            <TextareaAutosize
                className="editor-textarea"
                minRows={5} 
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange} 
            />
        </Box>
    )
}

export default CreatePost;
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
                if(response.isSuccess) {
                    setPost(prev => ({ ...prev, picture: response.data }));
                }
            }
        }
        getImage();
        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, account.username, location.search]);

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '20px 0' }}>
            <Box className="editor-container" sx={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '20px' }}>
                <img src={url} alt="post" className="editor-banner" style={{ borderRadius: '15px' }} />

                <Box className="editor-form" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 2 }}>
                    <label htmlFor="fileInput" className="add-icon-wrapper">
                        <Add fontSize="large" sx={{ color: '#6366f1' }} />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <InputBase 
                        className="editor-title-input" 
                        sx={{ color: '#fff', ml: 2 }}
                        onChange={handleChange} 
                        name='title' 
                        placeholder="Title" 
                    />
                    <Button onClick={savePost} className="btn-primary" sx={{ px: 4, height: '45px' }}>
                        Publish
                    </Button>
                </Box>

                <TextareaAutosize
                    className="editor-textarea"
                    style={{ 
                        background: 'transparent', 
                        color: '#e2e8f0', 
                        border: 'none', 
                        width: '100%', 
                        fontSize: '1.2rem', 
                        marginTop: '30px',
                        outline: 'none'
                    }}
                    minRows={10} 
                    placeholder="Tell your story..."
                    name='description'
                    onChange={handleChange} 
                />
            </Box>
        </Box>
    )
}

export default CreatePost;
import React, { useState, useEffect } from 'react';
import { Box, Button, InputBase, TextareaAutosize, styled } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?auto=format&fit=crop&w=1000&q=80';
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    setPost(prev => ({ ...prev, picture: response.data }));
                }
            }
        }
        getImage();
    }, [file])

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '20px 0' }}>
            <Box className="editor-container" sx={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '20px' }}>
                <img src={post.picture || url} alt="post" className="editor-banner" style={{ borderRadius: '15px' }} />

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
                        value={post.title} 
                        name='title' 
                        placeholder="Title" 
                    />
                    <Button onClick={updateBlogPost} className="btn-primary" sx={{ px: 4, height: '45px' }}>
                        Update
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
                    value={post.description}
                />
            </Box>
        </Box>
    )
}

export default Update;
import React, { useState, useEffect } from 'react';
import { Box, Button, InputBase, TextareaAutosize } from '@mui/material';
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
    const [imageURL, setImageURL] = useState('');

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
                    setImageURL(response.data);    
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
        <Box className="editor-container">
            <img src={post.picture || url} alt="post" className="editor-banner" />

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
                    value={post.title} 
                    name='title' 
                    placeholder="Title" 
                />
                <Button onClick={() => updateBlogPost()} className="btn-primary" sx={{px: 4}}>Update</Button>
            </Box>

            <TextareaAutosize
                className="editor-textarea"
                minRows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange} 
                value={post.description}
            />
        </Box>
    )
}

export default Update;
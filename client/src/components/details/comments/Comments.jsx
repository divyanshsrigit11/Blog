import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 40px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
`;

const Image = styled('img')({
    width: 45,
    height: 45,
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.1)'
});

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%; 
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 15px;
    font-size: 16px;
    color: #ffffff;
    font-family: inherit;
    resize: none;
    &:focus {
        outline: none;
        border-color: #6366f1;
    }
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            if (post._id) { 
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        await API.newComment(comment);
        setComment(initialValue);
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    minRows={3} 
                    placeholder="Join the discussion..."
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    className="btn-primary" // Use the class we defined in index.css
                    style={{ height: 45, minWidth: 100 }}
                    onClick={addComment}
                >Post</Button>             
            </Container>
            
            <Box sx={{ mt: 2 }}>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment 
                            key={comment._id} 
                            comment={comment} 
                            setToggle={setToggle} 
                        />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;
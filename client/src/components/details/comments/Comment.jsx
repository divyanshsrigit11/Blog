import { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.05); /* Soft glass effect */
    padding: 15px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Container = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 16px;
    margin-right: 15px;
    color: #6366f1; /* Indigo name */
`;

const StyledDate = styled(Typography)`
    font-size: 13px;
    color: #94a3b8; /* Muted slate */
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
    color: #f43f5e; /* Rose/Red delete icon */
    font-size: 20px;
    &:hover { transform: scale(1.1); }
`;

const CommentText = styled(Typography)`
    color: #e2e8f0; /* Light gray readable text */
    font-size: 15px;
    line-height: 1.6;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    
    const removeComment = async () => {
        console.log("Deleting Comment ID:", comment._id); 
        await API.deleteComment(comment._id);
        setToggle(prev => !prev);
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            <CommentText>{comment.comments}</CommentText>
        </Component>
    )
}

export default Comment;
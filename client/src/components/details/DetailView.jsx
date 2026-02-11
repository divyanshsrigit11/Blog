import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    padding: '20px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.05)', // Subtle glass effect for the post area
    backdropFilter: 'blur(10px)',
    [theme.breakpoints.down('md')]: {
        margin: 0,
        borderRadius: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '15px'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #6366f1;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover { background: rgba(99, 102, 241, 0.1); }
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #f43f5e;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover { background: rgba(244, 63, 94, 0.1); }
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 10px 0;
    color: #ffffff; /* White title */
    letter-spacing: -1px;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#94a3b8', // Muted slate color
    display: 'flex',
    margin: '20px 0',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '15px',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Description = styled(Typography)`
    color: #e2e8f0; /* Light gray for high readability on navy */
    font-size: 1.15rem;
    line-height: 1.8;
    word-break: break-word;
    white-space: pre-line;
    margin-top: 30px;
`;

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
    // Ensure you are passing post._id (the MongoDB ID) [cite: 58]
    let response = await API.deletePost(post._id); 
    
    if (response.isSuccess) {
        navigate('/');
    } else {
        console.error("Delete failed with code:", response.code);
    }
}

    return (
        <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container>
                <Image src={post.picture || url} alt="post" />
                
                <Box style={{ float: 'right', marginTop: '10px' }}>
                    {   
                        account.username === post.username && 
                        <>  
                            <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                            <DeleteIcon onClick={() => deleteBlog()} color="error" />
                        </>
                    }
                </Box>

                <Heading>{post.title}</Heading>

                <Author>
                    <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body1">
                            By: <span style={{fontWeight: 600, color: '#6366f1'}}>{post.username}</span>
                        </Typography>
                    </Link>
                    <Typography style={{marginLeft: 'auto'}}>
                        {new Date(post.createdDate).toDateString()}
                    </Typography>
                </Author>

                <Description>
                    {post.description}
                </Description>
                
                {/* comments section */}
                <Box sx={{ mt: 8, mb: 4 }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#ffffff', 
                            fontWeight: 700, 
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                        }}
                    >
                        Discussion
                        <Box sx={{ height: '2px', flexGrow: 1, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }} />
                    </Typography>
                    
                    <Comments post={post} />
                </Box>
            </Container>
        </Box>
    )
}

export default DetailView;

// import { useState, useEffect, useContext } from 'react';

// import { Box, Typography, styled } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import { Link, useNavigate, useParams } from 'react-router-dom'

// import { API } from '../../service/api';

// import { DataContext } from '../../context/DataProvider';

// // components
// import Comments from './comments/Comments';

// const Container = styled(Box)(({ theme }) => ({
//     margin: '50px 100px',
//     [theme.breakpoints.down('md')]: {
//         margin: 0
//     },
// }));

// const Image = styled('img')({
//     width: '100%',
//     height: '50vh',
//     objectFit: 'cover'
// });

// const EditIcon = styled(Edit)`
//     margin: 5px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

// const DeleteIcon = styled(Delete)`
//     margin: 5px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

// const Heading = styled(Typography)`
//     font-size: 38px;
//     font-weight: 600;
//     text-align: center;
//     margin: 50px 0 10px 0;
// `;

// const Author = styled(Box)(({ theme }) => ({
//     color: '#878787',
//     display: 'flex',
//     margin: '20px 0',
//     [theme.breakpoints.down('sm')]: {
//         display: 'block'
//     },
// }));

// const DetailView = () => {
//     const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
//     const [post, setPost] = useState({});
//     const { account } = useContext(DataContext);

//     const navigate = useNavigate();
//     const { id } = useParams();
    
//     useEffect(() => {
//         const fetchData = async () => {
//             let response = await API.getPostById(id);
//             if (response.isSuccess) {
//                 setPost(response.data);
//             }
//         }
//         fetchData();
//     }, []);

//     const deleteBlog = async () => {  
//         await API.deletePost(post._id);
//         navigate('/')
//     }

//     return (
//         <Container>
//             <Image src={post.picture || url} alt="post" />
//             <Box style={{ float: 'right' }}>
//                 {   
//                     account.username === post.username && 
//                     <>  
//                         <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
//                         <DeleteIcon onClick={() => deleteBlog()} color="error" />
//                     </>
//                 }
//             </Box>
//             <Heading>{post.title}</Heading>

//             <Author>
//                 <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
//                 </Link>
//                 <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
//             </Author>

//             <Typography>{post.description}</Typography>
//             <Comments post={post} />
//         </Container>
//     )
// }

// export default DetailView;
import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <Box sx={{ width: '100%' }}>
            {posts?.length ? (
                <Grid container spacing={3} alignItems="stretch"> 
                    {posts.map(post => (
                        /* lg={4} forces exactly 3 posts per row on desktop */
                        <Grid item key={post._id} xs={12} sm={6} lg={4} sx={{ display: 'flex' }}>
                            <Link
                                to={`details/${post._id}`}
                                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}
                            >
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            )}
        </Box>
    );
};

export default Posts;
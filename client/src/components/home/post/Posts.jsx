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
        <>
            {posts?.length ? (
                <Grid container spacing={2}>
                    {posts.map(post => (
                        <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                            <Link
                                to={`details/${post._id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
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
        </>
    );
};

export default Posts;

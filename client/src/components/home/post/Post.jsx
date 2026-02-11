import { Box, Typography, styled } from '@mui/material';

const CardContainer = styled(Box)`
    background: #ffffff;
    border-radius: 16px;
    /* Removed fixed height - now it's flexible */
    height: 100%; 
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease;
    border: 1px solid #e2e8f0;
    
    &:hover {
        transform: translateY(-5px);
    }
`;

const StyledImage = styled('img')({
    width: '100%',
    height: '200px', // We keep the image height fixed so the "horizon line" of the cards matches
    objectFit: 'cover',
});

const Post = ({ post }) => {
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=752&q=80';

    return (
        <CardContainer>
            <StyledImage src={url} alt="post" />
            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography sx={{ color: '#6366f1', fontSize: '0.75rem', fontWeight: 700, mb: 1 }}>
                    {post.categories}
                </Typography>
                
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b', mb: 1 }}>
                    {post.title}
                </Typography>

                <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem', mb: 2 }}>
                    By {post.username}
                </Typography>

                <Typography sx={{ color: '#f8fafc', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {post.description}
                </Typography>
            </Box>
        </CardContainer>
    );
};

export default Post;
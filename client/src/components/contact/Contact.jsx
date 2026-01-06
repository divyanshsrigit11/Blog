import { Box, styled, Typography, Link, Stack } from '@mui/material';
import { GitHub, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url("https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1470&q=80");
    width: 100%;
    height: 55vh;
    background-position: center;
    background-size: cover;
    border-radius: 0 0 20px 20px;
`;

const Wrapper = styled(Box)`
    padding: 40px 20px;
    max-width: 900px;
    margin: auto;
    text-align: center;
`;

const Text = styled(Typography)`
    color: #555;
    margin-top: 20px;
    line-height: 1.7;
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
    text-decoration: none;

    &:hover {
        color: #0072b1; /* LinkedIn blue */
        transition: color 0.3s;
    }
`;

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3" gutterBottom>
                    Let’s Connect!
                </Typography>
                <Text variant="h6">
                    I’m always open to discussing tech, collaborations, or any interesting opportunities.
                </Text>
                <Stack direction="column" spacing={2} alignItems="center" mt={4}>
                    <StyledLink href="https://www.linkedin.com/in/divyansh-srivastava-34894b219/" target="_blank">
                        <LinkedIn /> LinkedIn
                    </StyledLink>
                    <StyledLink href="https://my-portfolio-five-zeta-58.vercel.app/" target="_blank">
                        <GitHub /> My Portfolio
                    </StyledLink>
                    <StyledLink href="mailto:divyanshsri1101@gmail.com?Subject=Let's Connect!" target="_blank">
                        <Email /> Email Me
                    </StyledLink>
                </Stack>
            </Wrapper>
        </Box>
    );
};

export default Contact;

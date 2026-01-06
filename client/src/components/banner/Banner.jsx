import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    height: 60vh;
    background: url(https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1470&q=80) center/cover no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 64px;
    color: #fff;
    font-weight: 700;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
    letter-spacing: 2px;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #ffffffcc;
    color: #333;
    padding: 8px 20px;
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
`;

const Banner = () => {
    return (
        <Image>
            <Heading>My Blog</Heading>
            <SubHeading>Divyansh Srivastava</SubHeading>
        </Image>
    );
};

export default Banner;

// import React from 'react';
// import { GitHub, LinkedIn, Email } from '@mui/icons-material';

// const About = () => {
//     return (
//         <div className="w-full">
//             {/* Banner Image */}
//             <div 
//                 className="w-full h-[50vh] bg-cover bg-center rounded-b-[20px]"
//                 style={{ backgroundImage: `url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80)` }}
//             >
//             </div>

//             {/* Content Wrapper */}
//             <div className="py-8 px-5 max-w-[900px] mx-auto">
//                 <h3 className="text-3xl font-bold mb-5 text-gray-800">
//                     Divyansh Srivastava
//                 </h3>

//                 <div className="text-xl text-gray-600 mt-8 leading-loose">
//                     <p>
//                         I'm a Software Engineer based in India. I specialize in building responsive and scalable web applications using the{' '}
//                         <span className="font-bold text-gray-800">MERN Stack</span> and <span className="font-bold text-gray-800">.NET technologies</span>.
//                     </p>
                    
//                     <br />

//                     <p>
//                         Check out some of my favorite projects on{' '}
//                         <a 
//                             href="https://github.com/divyanshsrigit11?tab=repositories" 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="text-gray-700 hover:text-black transition-colors inline-flex items-center font-medium"
//                         >
//                             <GitHub className="mr-1" fontSize="small" /> GitHub
//                         </a>.
//                     </p>
//                 </div>

//                 <div className="text-xl text-gray-600 mt-8 leading-loose">
//                     <p>
//                         Need something built or just want to connect? Find me on{' '}
//                         <a 
//                             href="https://www.linkedin.com/in/divyansh-srivastava-34894b219/" 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="text-gray-700 hover:text-blue-600 transition-colors inline-flex items-center font-medium"
//                         >
//                             <LinkedIn className="mr-1" fontSize="small" /> LinkedIn
//                         </a>{' '}
//                         or feel free to send me an email at{' '}
//                         <a 
//                             href="mailto:divyanshsri1101@gmail.com?Subject=Let's Connect" 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="text-gray-700 hover:text-red-500 transition-colors inline-flex items-center font-medium"
//                         >
//                             <Email className="mr-1" fontSize="small" /> divyanshsri1101@gmail.com
//                         </a>.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default About;


import { Box, styled, Typography, Link } from '@mui/material'; 
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80);
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    border-radius: 0 0 20px 20px;
`;

const Wrapper = styled(Box)`
    padding: 30px 20px;
    max-width: 900px;
    margin: auto;
    & > h3 {
        font-weight: bold;
        margin-bottom: 20px;
    }
    & > h5 {
        margin-top: 30px;
        line-height: 1.8;
    }
`;

const Text = styled(Typography)`
    color: #555;
`;

const About = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Divyansh Srivastava</Typography>
                <Text variant="h5">
                    I'm a Software Engineer based in India. I specialize in building responsive and scalable web applications using the{' '}
                    <strong>MERN Stack</strong> and <strong>.NET technologies</strong>.
                    <br /><br />
                    Check out some of my favorite projects on{' '}
                    <Link href="https://github.com/divyanshsrigit11?tab=repositories" color="inherit" target="_blank">
                        <GitHub sx={{ verticalAlign: 'middle', mr: 0.5 }} /> GitHub
                    </Link>.
                </Text>

                <Text variant="h5">
                    Need something built or just want to connect? Find me on{' '}
                    <Link href="https://www.linkedin.com/in/divyansh-srivastava-34894b219/" color="inherit" target="_blank">
                        <LinkedIn sx={{ verticalAlign: 'middle', mr: 0.5 }} /> LinkedIn
                    </Link>{' '}
                    or feel free to send me an email at{' '}
                    <Link href="mailto:divyanshsri1101@gmail.com?Subject=Let's Connect" color="inherit" target="_blank">
                        <Email sx={{ verticalAlign: 'middle', mr: 0.5 }} /> divyanshsri1101@gmail.com
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
};

export default About;

import { Box, Typography } from '@mui/material';
import { GitHub, Email, LinkedIn, Launch } from '@mui/icons-material';

const Contact = () => {
    return (
        <Box className="contact-container">
            <Box className="contact-card">
                <Typography variant="h3" className="contact-title">
                    Let’s Connect!
                </Typography>
                
                <Typography className="contact-subtitle">
                    I’m always open to discussing tech, collaborations, or any interesting opportunities.
                </Typography>

                <Box className="contact-links-grid">
                    <a 
                        href="https://www.linkedin.com/in/divyansh-srivastava-34894b219/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="contact-item"
                    >
                        <LinkedIn sx={{ color: '#0072b1' }} /> LinkedIn
                    </a>

                    <a 
                        href="https://my-portfolio-five-zeta-58.vercel.app/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="contact-item"
                    >
                        <Launch sx={{ color: '#6366f1' }} /> My Portfolio
                    </a>

                    <a 
                        href="mailto:divyanshsri1101@gmail.com?Subject=Let's Connect!" 
                        className="contact-item"
                    >
                        <Email sx={{ color: '#ea4335' }} /> Email Me
                    </a>
                </Box>
                
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #f3f4f6' }}>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        Based in Lucknow, India 🇮🇳
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;
import { Box, Typography } from '@mui/material'; 
import { GitHub, LinkedIn, Email, FolderSpecial, Language } from '@mui/icons-material';

import heroVideo from '../../assets/hero-bg.mp4';
import heroPoster from '../../assets/hero-bg.png';

const About = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            {/* Full Page Video Background */}
            <video autoPlay muted loop playsInline poster={heroPoster} className="about-video-bg">
                <source src={heroVideo} type="video/mp4" />
            </video>
            <Box className="full-page-overlay" />
            
            <Box className="about-content-wrapper">
                <Typography variant="h2" className="about-title">
                    Divyansh Srivastava
                </Typography>
                
                <Typography className="about-text">
                    I'm a <strong>Full Stack Web Developer</strong> based in India. 
                    I specialize in building responsive and scalable web applications using the 
                    <strong> MERN Stack</strong> and <strong>.NET technologies</strong>.
                </Typography>

                {/* Primary Actions */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
                    <a href="https://your-portfolio-link.com" target="_blank" className="action-btn btn-portfolio">
                        <Language /> View Portfolio
                    </a>
                    <a href="/projects" className="action-btn btn-gallery">
                        <FolderSpecial /> Project Gallery
                    </a>
                </Box>

                {/* Social Secondary Links */}
                <Box className="social-link-group">
                    <a href="https://github.com/divyanshsrigit11" target="_blank" rel="noreferrer" className="social-chip">
                        <GitHub fontSize="small" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/divyansh-srivastava-34894b219/" target="_blank" rel="noreferrer" className="social-chip">
                        <LinkedIn fontSize="small" /> LinkedIn
                    </a>
                    <a href="mailto:divyanshsri1101@gmail.com" className="social-chip">
                        <Email fontSize="small" /> Email Me
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
import React from 'react';
import { Box } from '@mui/material';

// Ensure these paths correctly match your folder structure
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        // <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
        //     <Banner />
        //     {/* Using flex container instead of just a raw Grid to ensure side-by-side behavior */}
        //     <Box sx={{ 
        //         display: 'flex', 
        //         flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, side-by-side on desktop
        //         maxWidth: '1400px', 
        //         margin: '0 auto', 
        //         padding: { xs: 2, md: 4 },
        //         gap: 4 
        //     }}>
        //         {/* Sidebar - Fixed Width on Desktop */}
        //         <Box sx={{ width: { xs: '100%', sm: '250px', lg: '280px' }, flexShrink: 0 }}>
        //             <Categories />
        //         </Box>

        //         {/* Posts - Takes remaining space */}
        //         <Box sx={{ flexGrow: 1 }}>
        //             <Posts />
        //         </Box>
        //     </Box>
        // </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, px: 4, py: 4 }}>
    {/* Sidebar: Fixed width so it doesn't "push" the grid */}
    <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
        <Categories />
    </Box>

    {/* Posts: Fills the rest */}
    <Box sx={{ flexGrow: 1 }}>
        <Posts />
    </Box>
</Box>
    );
};

export default Home;
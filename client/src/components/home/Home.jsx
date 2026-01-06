import { Grid, Box } from '@mui/material';

// components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {/* Sidebar - Categories */}
                    <Grid item xs={12} sm={3} lg={2}>
                        <Categories />
                    </Grid>

                    {/* Main content - Posts */}
                    <Grid item xs={12} sm={9} lg={10}>
                        <Posts />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;

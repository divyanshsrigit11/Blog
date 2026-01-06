import { AppBar, Toolbar, styled, Button, Drawer, IconButton, List, ListItem, useTheme, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
  box-shadow: none;
  position: fixed;
  top: 0;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const MenuLinks = styled(Box)`
  display: flex;
  gap: 20px;
  align-items: center;

  & a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #3f51b5;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    padding: 20px;
  }

  & a {
    text-decoration: none;
    color: black;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 10px;
    display: block;
  }

  & a:hover {
    color: #3f51b5;
  }
`;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const logout = () => navigate('/account');

  const links = (
    <>
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/contact">CONTACT</Link>
      <Button onClick={logout} style={{ color: 'black' }}>LOGOUT</Button>
    </>
  );

  return (
    <>
      <Component>
        <Container>
          <Link to="/" style={{ fontWeight: 700, fontSize: '1.3rem', textDecoration: 'none', color: '#3f51b5' }}>
            Divyansh's Blog
          </Link>
          {isMobile ? (
            <>
              <IconButton onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <StyledDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                  <ListItem>{links}</ListItem>
                </List>
              </StyledDrawer>
            </>
          ) : (
            <MenuLinks>{links}</MenuLinks>
          )}
        </Container>
      </Component>

      {/* Add spacing to prevent content hiding under fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;

import { AppBar, Toolbar, Button, IconButton, Drawer, List, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <AppBar className="navbar-custom" elevation={0} position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          
          <Link to="/" className="nav-logo">
            Divyansh's <span>Blog</span>
          </Link>

          {isMobile ? (
            <>
              <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 250, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {navItems.map(item => (
                    <Link key={item.path} to={item.path} className="nav-link" onClick={() => setDrawerOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                  <Button variant="contained" onClick={() => navigate('/account')} sx={{ bgcolor: 'var(--primary-color)' }}>Logout</Button>
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {navItems.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <Button onClick={() => navigate('/account')} className="logout-btn">Logout</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
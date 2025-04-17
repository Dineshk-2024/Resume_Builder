import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavBar = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Personal Info', path: '/personal-info' },
    { label: 'Summary', path: '/summary' },
    { label: 'Education', path: '/education' },
    { label: 'Experience', path: '/experience' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Preview', path: '/preview' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color="info">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Resume Builder
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            menuItems.map((item) => (
              <Button key={item.label} color="inherit" onClick={() => handleNavigate(item.path)}>
                {item.label}
              </Button>
            ))
          )}

          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for Mobile View */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.label} onClick={() => handleNavigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;

import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavBar = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="info">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resume Builder
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/personal-info')}>Personal Info</Button>
        <Button color="inherit" onClick={() => navigate('/summary')}>Summary</Button> {/* Added Summary */}
        <Button color="inherit" onClick={() => navigate('/education')}>Education</Button>
        <Button color="inherit" onClick={() => navigate('/experience')}>Experience</Button>
        <Button color="inherit" onClick={() => navigate('/skills')}>Skills</Button>
        <Button color="inherit" onClick={() => navigate('/projects')}>Projects</Button>
        <Button color="inherit" onClick={() => navigate('/preview')}>Preview</Button>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

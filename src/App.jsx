import React, { useState } from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Link,
  Button,
  TextField,
} from '@mui/material';
import { Abc, Report } from '@mui/icons-material';
import Vendors from './components/Vendors/Vendors';
import Inventory from './components/Inventory';

export default function App() {
  const [authorized, setAuthorized] = useState(
    window.sessionStorage.getItem('authorized') ? true : false
  );
  const [accessCode, setAccessCode] = useState('');
  const drawerWidth = 250;

  const modules = ['Home', 'Vendors'];
  const moduleElementMap = {
    Home: <Home />,
    Vendors: <Vendors />,
    Inventory: <Inventory />,
  };
  const moduleUrlMap = {
    Home: ['/', '/#'],
    Vendors: ['/vendors'],
    Inventory: ['/inventory'],
  };

  const drawerListItems = modules.map((element) => (
    <ListItem key={element} disablePadding>
      <ListItemButton
        component={Link}
        to={element === 'Home' ? '' : `#/${element.toLowerCase()}`}
        selected={moduleUrlMap[element].includes(window.location.pathname)}
      >
        <ListItemIcon>
          <Abc />
        </ListItemIcon>
        <ListItemText primary={element} />
      </ListItemButton>
    </ListItem>
  ));

  const navigationDrawer = (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>{drawerListItems}</List>
    </Drawer>
  );

  const authHandler = () => {
    if (accessCode === process.env.REACT_APP_ACCESS_CODE) {
      setAuthorized(true);
    }
  };

  const inputChangeHandler = (e) => {
    if (e.keyCode === 13) {
      authHandler(accessCode);
    } else {
      setAccessCode(e.target.value);
      window.sessionStorage.setItem('authorized', true);
    }
  };

  return !authorized ? (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box
        sx={{
          position: 'relative',
          top: '30vh',
          maxWidth: '40vw',
          margin: 'auto',
        }}
      >
        <Typography variant="h6" marginBottom={2}>
          Self Serve Portal Authentication
        </Typography>
        <TextField
          fullWidth
          name="password"
          key="password"
          label="Access Code"
          onKeyDown={inputChangeHandler}
          onChange={inputChangeHandler}
        />
        <Button onClick={authHandler} sx={{ float: 'right', marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  ) : (
    <HashRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">FWW Self Serve Portal</Typography>
              <Button
                startIcon={<Report />}
                color="inherit"
                variant="outlined"
                target="_blank"
                href={
                  'https://github.com/Factory-Wheel-Warehouse/employee-portal/issues'
                }
              >
                Report an issue
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {navigationDrawer}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route key={'home'} path="/" element={<Home />} />
            {modules.map((module) => (
              <Route
                key={module}
                path={`/${module.toLowerCase()}`}
                element={moduleElementMap[module]}
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </HashRouter>
  );
}

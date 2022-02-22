import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, IconButton, List, Toolbar, Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, Cameras } from '../utils/listItems';
import AppBar from '../components/AppBar';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { UI } from '../utils/constants';
import { Outlet } from 'react-router-dom';

const mdTheme = createTheme();

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: UI.DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const DashboardView = (props) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handle = useFullScreenHandle();

  return (
    <ThemeProvider theme={mdTheme}>
      <FullScreen handle={handle}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            onDrawerClose={handleDrawerClose}
            onDrawerOpen={handleDrawerOpen}
            isOpen={open}
            enterFullscreen={handle.enter}
          />

          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <MainListItems />
            </List>
            <Divider />
            <List>
              <Cameras />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto'
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </FullScreen>
    </ThemeProvider>
  );
};

export default DashboardView;

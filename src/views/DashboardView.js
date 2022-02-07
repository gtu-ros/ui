import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, Cameras } from '../utils/listItems';
import RoboticArmDashboard from './RoboticArmDashboard';
import NavigationDashboard from './NavigationDashboard';
import AppBar from '../components/AppBar';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import MainLayout from './MainLayout';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  let styles = {
    root: {
      display: 'flex',
      backgroundColor: theme.palette.grey[100]
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7)
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      // padding: '20px',
      height: '100vh',
      overflow: 'auto'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    }
  };

  const fixedHeights = [...Array(12).keys()].map((n) => ({
    [`fixedHeight${n}`]: { height: n * 90 }
  }));

  styles = Object.assign({}, styles, ...fixedHeights);

  return styles;
});

const DashboardView = (props) => {
  const classes = useStyles();
  const dashboardStates = {
    main: <MainLayout />,
    roboticArm: <RoboticArmDashboard />,
    navigation: <NavigationDashboard />
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [dashboardState, setDashboardState] = useState(dashboardStates.main);
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <div className={classes.root}>
        <AppBar
          onDrawerClose={handleDrawerClose}
          onDrawerOpen={handleDrawerOpen}
          isOpen={open}
          enterFullscreen={handle.enter}
        />

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems
              dashboardStates={dashboardStates}
              setDashboardState={setDashboardState}
            />
          </List>
          <Divider />
          <List>
            <Cameras />
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {dashboardState}
        </main>
      </div>
    </FullScreen>
  );
};

export { useStyles };
export default DashboardView;

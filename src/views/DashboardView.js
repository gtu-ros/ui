import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { JointStates } from '../components/JointStates';
import { TransformClient } from '../components/TransformClient';
import { ModelVisualizer } from '../components/ModelVisualizer';
import { simulation } from '../utils/constants';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography,
  Paper
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
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
    flexGrow: 1
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
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: '100px',
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 300
  }
}));

const DashboardView = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, false && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            GTU Rover - Robotic Arm
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={''} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ModelVisualizer
              urdfPath={
                'http://' +
                process.env.REACT_APP_FILE_SERVER_URL +
                ':' +
                process.env.REACT_APP_FILE_SERVER_PORT
              }
              targetFrame={simulation.constants.ROBOT_BASE_LINK}
              tfRate={simulation.config.tfRate}
              width={simulation.config.width}
              height={simulation.config.height}
              cameraPosition={simulation.config.cameraPosition}
            />
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={8} className={fixedHeightPaper}>
              <JointStates topic={simulation.constants.JOINT_STATES_TOPIC} />
            </Paper>
            <br />
            <Paper elevation={8} className={fixedHeightPaper}>
              <TransformClient
                targetFrame={simulation.constants.WORLD_LINK}
                sourceFrame={simulation.constants.PANDA_EE_PARENT_LINK}
                tfRate={10}
              />
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DashboardView;

import clsx from 'clsx';
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

import { Menu, Fullscreen } from '@material-ui/icons';
import { useStyles } from '../../views/DashboardView';

const AppBar = ({ onDrawerOpen, onDrawerClose, isOpen, enterFullscreen }) => {
  const classes = useStyles();

  return (
    <MuiAppBar
      position="absolute"
      className={clsx(classes.appBar, isOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          onClick={onDrawerOpen}
          color="inherit"
          className={clsx(
            classes.menuButton,
            isOpen && classes.menuButtonHidden
          )}
        >
          <Menu />
        </IconButton>
        <img style={{ width: 40, marginRight: 20 }} src="./logo.png" />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          GTU Rover
        </Typography>
        <IconButton color="inherit" onClick={enterFullscreen}>
          <Fullscreen />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

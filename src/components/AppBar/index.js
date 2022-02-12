import clsx from 'clsx';
import MuiAppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from '@mui/material';

import { Menu, Fullscreen } from '@mui/icons-material';
// import { useStyles } from '../../views/DashboardView';
import { useSelector } from 'react-redux';
import { selectTitle } from '../../redux/ui/ui.selectors';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { UI } from '../../utils/constants';

const StyledMuiAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const AppBar = ({ onDrawerOpen, onDrawerClose, isOpen, enterFullscreen }) => {
  const title = useSelector(selectTitle);

  return (
    <StyledMuiAppBar
      position="absolute"
      open={isOpen}
      drawerWidth={UI.DRAWER_WIDTH}
    >
      <Toolbar
      // className={classes.toolbar}
      >
        <IconButton
          edge="start"
          onClick={onDrawerOpen}
          color="inherit"
          sx={{
            marginRight: '36px',
            ...(isOpen && { display: 'none' })
          }}
        >
          <Menu />
        </IconButton>
        <img style={{ width: 40, marginRight: 20 }} src="./logo.png" />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <IconButton color="inherit" onClick={enterFullscreen}>
          <Fullscreen />
        </IconButton>
      </Toolbar>
    </StyledMuiAppBar>
  );
};

export default AppBar;

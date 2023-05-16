import MuiAppBar from '@mui/material/AppBar';
import {
  IconButton,
  Toolbar,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid
} from '@mui/material';
import { Menu, Fullscreen, History, Stream } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectMissionLogOpen, selectTitle } from '../../redux/ui/ui.selectors';
import { styled } from '@mui/material/styles';
import { UI } from '../../utils/constants';
import { toggleMissionLog } from '../../redux/ui/ui.actions';
import { purple } from '@mui/material/colors';

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
  const missionLogOpen = useSelector(selectMissionLogOpen);
  const dispatch = useDispatch();

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

        <ToggleButtonGroup
          color="primary"
          size="small"
          exclusive
          value={missionLogOpen ? 'history' : 'stream'}
          onChange={(event, newAlignment) => {
            if (newAlignment === 'history' && !missionLogOpen)
              dispatch(toggleMissionLog());
            if (newAlignment === 'stream' && missionLogOpen)
              dispatch(toggleMissionLog());
          }}
          sx={{ backgroundColor: (theme) => theme.palette.grey[200], mr: 2 }}
        >
          <ToggleButton value="history">
            <History />
          </ToggleButton>
          <ToggleButton value="stream">
            <Stream />
          </ToggleButton>
        </ToggleButtonGroup>

        <IconButton color="inherit" onClick={enterFullscreen}>
          <Fullscreen />
        </IconButton>
      </Toolbar>
    </StyledMuiAppBar>
  );
};

export default AppBar;

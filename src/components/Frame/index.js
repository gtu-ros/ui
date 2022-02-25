import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import LargeModal from '../LargeModal';
import { ZoomOutMap, OpenInBrowser } from '@mui/icons-material';
import './style.css';
import { Link } from 'react-router-dom';

export const FrameTitle = ({ children }) => {
  return (
    <Typography
      style={{ margin: 'auto 0', display: 'inline' }}
      variant="subtitle2"
      color="primary"
      align="left"
      gutterBottom
    >
      {children}
    </Typography>
  );
};

const Header = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        cursor: 'grab',
        paddingLeft: 4,
        zIndex: 10
      }}
    >
      {children}
    </div>
  );
};

const WindowButton = ({ children }) => (
  <IconButton
    className="cancel-draggable"
    size="small"
    edge="start"
    color="inherit"
  >
    {children}
  </IconButton>
);

const windowIconStyle = { transform: 'scale(0.6)' };

const Frame = ({ children, title, pluginKey, fixed = true }) => {
  const { showModal } = useModal();

  const zoomOutButton = (
    <WindowButton>
      <ZoomOutMap style={windowIconStyle} />
    </WindowButton>
  );

  const newWindow = (
    <Link to={`/${pluginKey}`} target="_blank" rel="noopener noreferrer">
      <WindowButton>
        <OpenInBrowser style={windowIconStyle} />
      </WindowButton>
    </Link>
  );

  return (
    <div
      style={{ height: '100%', overflow: fixed ? 'hidden' : 'auto' }}
      className="wrapper"
    >
      <Box sx={fixed && { height: '100%' }} padding={0}>
        <Header>
          <Grid container justifyContent="space-between">
            <FrameTitle className="draggable">{title}</FrameTitle>
            <div className="window-buttons">
              {newWindow}
              {zoomOutButton}
            </div>
          </Grid>
        </Header>
        <Box
          sx={fixed && { height: 'calc(100% - 30px)' }} // header height: 30px
          className="cancel-draggable"
        >
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default Frame;

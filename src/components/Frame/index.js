import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import LargeModal from '../LargeModal';
import { ZoomOutMap, OpenInBrowser } from '@mui/icons-material';
import './style.css';
import { Link } from 'react-router-dom';
import useRosWs from '../../hooks/useRosWs';
import VisibilityToggle from '../VisibilityToggle';
import usePluginState from '../../hooks/usePluginState';

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
        zIndex: 10
      }}
    >
      {children}
    </div>
  );
};

const WindowButton = ({ children, ...rest }) => (
  <IconButton
    {...rest}
    className="cancel-draggable"
    size="small"
    edge="start"
    color="inherit"
  >
    {children}
  </IconButton>
);

const windowIconStyle = { transform: 'scale(0.6)' };

const Frame = ({ children, title, pluginKey, fixed = false }) => {
  const { showModal } = useModal();
  const { url } = useRosWs();
  const { status, toggleStatus } = usePluginState(pluginKey);

  const zoomOutButton = (
    <WindowButton onClick={() => showModal(LargeModal, { title, children })}>
      <ZoomOutMap style={windowIconStyle} />
    </WindowButton>
  );

  const newWindow = (
    <Link
      to={`/${pluginKey}?ROS_URL=${url}`}
      target="_blank"
      rel="noopener noreferrer"
    >
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
            <div style={{ display: 'flex' }}>
              <VisibilityToggle
                status={status}
                onToggle={() => toggleStatus()}
              />
              <FrameTitle className="draggable">{title}</FrameTitle>
            </div>
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
          {status !== 'disabled' && children}
        </Box>
      </Box>
    </div>
  );
};

export default Frame;

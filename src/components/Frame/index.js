import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import LargeModal from '../LargeModal';
import { ZoomOutMap } from '@mui/icons-material';
import './style.css';

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

const Frame = ({ children, title, fixed = false }) => {
  const { showModal } = useModal();

  const zoomOutButton = (
    <IconButton
      className="zoomOutButton cancel-draggable"
      size="small"
      edge="start"
      onClick={() => showModal(LargeModal, { title, children })}
      color="inherit"
    >
      <ZoomOutMap style={{ transform: 'scale(0.6)' }} />
    </IconButton>
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
            {zoomOutButton}
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

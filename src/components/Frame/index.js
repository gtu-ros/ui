import { Box, Typography } from '@material-ui/core';

export const FrameTitle = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        cursor: 'grab',
        paddingTop: -1,
        zIndex: 10
      }}
    >
      <Typography
        style={{ margin: 0 }}
        variant="subtitle2"
        color="primary"
        align="left"
        gutterBottom
      >
        {children}
      </Typography>
    </div>
  );
};

const Frame = ({ children, title, fixed = false }) => {
  return (
    <div style={{ height: '100%', overflow: fixed ? 'hidden' : 'auto' }}>
      <Box sx={fixed && { height: '100%' }} padding={0}>
        <FrameTitle className="draggable">{title}</FrameTitle>
        <Box sx={fixed && { height: '100%' }} className="cancel-draggable">
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default Frame;

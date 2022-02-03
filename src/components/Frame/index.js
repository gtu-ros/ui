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

const Frame = ({ children, title }) => {
  return (
    <Box padding={0}>
      <FrameTitle className="draggable">{title}</FrameTitle>
      <Box className="cancel-draggable">{children}</Box>
    </Box>
  );
};

export default Frame;

import { Box } from "@mui/material";

export default ({ error }) => {
  return (
    <Box p={1}>
      <p>ERROR:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </Box>
  );
};

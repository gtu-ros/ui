import { TextField, Box } from '@material-ui/core';

// TODO: subscribed status
const RostopicEcho = ({
  message,
  topic,
  queue,
  compression,
  handleTopic,
  handleQueue,
  handleCompression
}) => {
  return (
    <div>
      <Box sx={{ '& .MuiTextField-root': { margin: 10, width: '100%' } }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Topic"
            placeholder="/zed2/odom"
            defaultValue={topic}
            onChange={(event) => handleTopic(event.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Message queue length"
            defaultValue={queue}
            onChange={(event) => handleQueue(event.target.value)}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Compression"
            defaultValue={compression}
            onChange={(event) => handleCompression(event.target.value)}
          />
        </Box>
      </Box>
      <pre>{JSON.stringify(message, null, 4)}</pre>
    </div>
  );
};

export default RostopicEcho;

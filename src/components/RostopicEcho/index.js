import { TextField, Box } from '@mui/material';
import ReactJson from 'react-json-view';

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
      <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '100%' } }}>
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
      {/* <pre>{JSON.stringify(message, null, 4)}</pre> */}
      <ReactJson
        src={message}
        style={{ paddingLeft: 4 }}
        name={false}
        indentWidth={2}
        displayDataTypes={false}
        displayObjectSize={false}
      />
      {/* <img src={message?.data} /> */}
    </div>
  );
};

export default RostopicEcho;

import { useEffect, useState, useMemo } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import useMessage from '../../hooks/useMessage';
import usePluginState from '../../hooks/usePluginState';
import VideoStream from '../VideoStream';
import { compressedToUrl, decodeB64, readQRData } from './utils';
import { Download, QrCode } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useModal } from 'mui-modal-provider';
import { Modal } from '../Modal';

const RosImage = ({ pluginKey, topic, throttleRate: initialThrottleRate }) => {
  const [throttleRate, setThrottleRate] = useState(initialThrottleRate);
  const { setOnline, setOffline, setData } = usePluginState(pluginKey);
  const { message } = useMessage(pluginKey, topic, throttleRate);
  const { showModal } = useModal();

  const downloadImage = () => {
    if (message?.data)
      saveAs(compressedToUrl(message.data), `${+new Date()}.jpg`);
  };

  const readQRCode = () => {
    if (message?.data) {
      decodeB64(message.data).then((i) => {
        const text = readQRData(i);
        console.log(text);
        showModal(Modal, { title: 'QR Code', children: text || 'Not found' });
      });
    }
  };

  useEffect(() => {
    message ? setOnline() : setOffline();
    setData({ timestamp: message?.header?.stamp?.secs });
  }, [message]);

  return (
    <div>
      <Box sx={{ display: 'flex', spacing: 20 }}>
        <TextField
          style={{ margin: 10 }}
          size="small"
          variant="outlined"
          label="Throttle rate (ms)"
          defaultValue={throttleRate}
          onBlur={(event) => setThrottleRate(+event.target.value)}
        />
        <IconButton onClick={downloadImage}>
          <Download />
        </IconButton>
        <IconButton onClick={readQRCode}>
          <QrCode />
        </IconButton>
      </Box>
      <VideoStream data={message?.data} />
    </div>
  );
};

export default RosImage;

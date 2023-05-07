import { useEffect, useState } from 'react';
import { compressedToUrl } from './utils';

const VideoStream = ({ data }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (data) setSrc(compressedToUrl(data));
    else setSrc('');
  }, [data]);

  return src ? (
    <img
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'contain'
      }}
      src={src}
    />
  ) : (
    ''
  );
};

export default VideoStream;

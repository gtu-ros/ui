import { useEffect, useState } from 'react';

const VideoStream = ({ data }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (data) setSrc('data:image/jpeg;base64,' + data);
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

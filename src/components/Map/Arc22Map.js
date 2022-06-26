import { Source, Layer } from 'react-map-gl';
import { arcMapPaths } from './constants';

const Arc22Map = () => {
  return (
    <Source
      type="image"
      url={arcMapPaths.annoted} // TODO: dynamic switch
      coordinates={[
        // TODO: dynamic calibration
        [29.020459451282786, 41.10162164954949],
        [29.020867048538737, 41.10153389087013],
        [29.02074299188313, 41.10119431695273],
        [29.020342991775973, 41.10130878346744]
      ]}
    >
      <Layer type="raster" />
    </Source>
  );
};

export default Arc22Map;

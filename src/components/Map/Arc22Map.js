import { useState } from 'react';
import { Source, Layer } from 'react-map-gl';
import { marsFieldPath } from './constants';
import FieldResizer from './FieldResizer';

export const MarsField = ({ edit, id = 'mars-field' }) => {
  const [corners, setCorners] = useState([
    [29.020459451282786, 41.10162164954949],
    [29.020867048538737, 41.10153389087013],
    [29.02074299188313, 41.10119431695273],
    [29.020342991775973, 41.10130878346744]
  ]);

  return (
    <>
      <Source
        type="image"
        url={marsFieldPath.annoted} // TODO: dynamic switch
        coordinates={corners}
      >
        <Layer type="raster" id={`${id}-layer`} />
        {edit && (
          <FieldResizer
            id={`${id}-field-resizer`}
            initalCorners={corners}
            onDragEnd={setCorners}
          />
        )}
      </Source>
    </>
  );
};

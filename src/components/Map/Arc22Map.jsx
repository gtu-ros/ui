import { useState } from 'react';
import { Source, Layer } from 'react-map-gl';
import { marsFieldPath } from './constants';
import FieldResizer from './FieldResizer';

const marsFieldCoordinates = [

  [32.770125440045376, 39.90136337737712], // sol alt
  [32.769962411838236, 39.90133928870429], //sol üst
  [32.77004582337483, 39.90147003111326], // sağ üst
  [32.770161832872446, 39.90144968391988,], // sağ alt
];

export const MarsField = ({ edit, id = 'mars-field' }) => {
  const [corners, setCorners] = useState(marsFieldCoordinates);

  return (
    <>
      <Source
        type="image"
        url={marsFieldPath.metu} // TODO: dynamic switch
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

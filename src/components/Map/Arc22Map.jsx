import { useState } from 'react';
import { Source, Layer } from 'react-map-gl';
import { marsFieldPath } from './constants';
import FieldResizer from './FieldResizer';

const marsFieldCoordinates = [
  [29.021333822789757, 41.09993672344968],
  [29.02174141887747, 41.099848964770246],
  [29.021617357701643, 41.099509390852866],
  [29.021217359118282, 41.09962385736763]
];

export const MarsField = ({ edit, id = 'mars-field' }) => {
  const [corners, setCorners] = useState(marsFieldCoordinates);

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

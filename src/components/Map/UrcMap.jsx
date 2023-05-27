import { Source, Layer } from 'react-map-gl';

export const UrcMap = ({}) => {
  const boundsToCorners = (y1, x1, y2, x2) => [
    [x1, y1],
    [x2, y1],
    [x2, y2],
    [x1, y2]
  ];

  const x = -0.00038;
  const y = 0.00028;

  const corners = boundsToCorners(
    38.40946671534478 + y,
    -110.79597548331155 + x,
    38.402843785371886 + y,
    -110.78740625748266 + x
  );

  return (
    <>
      <Source type="image" url={'/maps/mdrs.png'} coordinates={corners}>
        <Layer
          type="raster"
          id={`mdrs-layer`}
          paint={{
            'raster-opacity': 1
          }}
        />
      </Source>
    </>
  );
};

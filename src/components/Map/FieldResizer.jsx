import { orange } from '@mui/material/colors';
import { useState } from 'react';
import { Source, Layer, Marker } from 'react-map-gl';
import { Dot, Center } from './MarkerIcons';
import {
  getCentroid,
  getPolygonLengths,
  toClosedPolygon,
  transformPoly,
  turfDistanceToMeters
} from './utils';

const FieldResizer = ({ initalCorners, onDragEnd, id = 'field-resizer' }) => {
  const [corners, setCorners] = useState(initalCorners);

  const handleDrag = (v, i) => {
    const newCorners = [...corners];
    newCorners[i] = [v.lngLat.lng, v.lngLat.lat];
    setCorners(newCorners);
    return newCorners;
  };

  const handleDragEnd = (v, i) => {
    const newCorners = handleDrag(v, i);
    onDragEnd(newCorners);
  };

  const handleDragCentroid = (v) => {
    const newCorners = transformPoly(corners)(center)(v.lngLat.toArray());
    console.log(newCorners);
    setCorners(newCorners);
    return newCorners;
  };

  const handleDragEndCentroid = (v) => {
    const newCorners = handleDragCentroid(v);
    onDragEnd(newCorners);
  };

  const center = getCentroid(corners);

  const { lengths, lineMids } = getPolygonLengths(corners);

  return (
    <>
      <Source
        type="geojson"
        data={{
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [toClosedPolygon(corners)]
          }
        }}
      >
        <Layer
          type="fill"
          id={`${id}-area-layer`} // id is required for layers by mapbox
          paint={{ 'fill-color': orange[100], 'fill-opacity': 0.2 }}
          beforeId={`${id}-line-layer`}
        />
        <Layer
          type="line"
          id={`${id}-line-layer`}
          paint={{
            'line-color': orange[400],
            'line-width': 2,
            'line-dasharray': [2, 2]
          }}
        />
      </Source>
      {corners.map((c, i) => (
        <Marker
          longitude={c[0]}
          latitude={c[1]}
          anchor="center"
          draggable
          onDrag={(v) => handleDrag(v, i)}
          onDragEnd={(v) => handleDragEnd(v, i)}
        >
          <Dot size={14} />
        </Marker>
      ))}
      {lineMids.map((c, i) => (
        <Marker  longitude={c[0]} latitude={c[1]} anchor="center">
          {turfDistanceToMeters(lengths[i]).toFixed(2)}
        </Marker>
      ))}
      {center && (
        <Marker
          longitude={center[0]}
          latitude={center[1]}
          anchor="center"
          draggable
          onDrag={handleDragCentroid}
          onDragEnd={handleDragEndCentroid}
        >
          <Center size={54} />
        </Marker>
      )}
    </>
  );
};

export default FieldResizer;

import { uniqueId } from 'lodash';
import { Marker, Source, Layer } from 'react-map-gl';

export const CustomMarker = ({ coordinates, text, color, onDrag, onDragEnd }) =>
  coordinates ? (
    <Marker {...coordinates} anchor="top">
      <div>
        <Marker
          draggable
          {...coordinates}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          color={color}
        />
        {text}
      </div>
    </Marker>
  ) : (
    ''
  );

export const PointMarker = ({ id, coordinates }) => {
  const geojson = ({ latitude, longitude }) => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [longitude, latitude] }
      }
    ]
  });

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': 'red'
    }
  };
  return (
    <Source type="geojson" data={geojson(coordinates)}>
      <Layer id={id || uniqueId()} {...layerStyle} />
    </Source>
  );
};

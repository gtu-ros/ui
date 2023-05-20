import { uniqueId } from 'lodash';
import { useEffect } from 'react';
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

export const ArrowMarker = ({ id, coordinates }) => {
  const geojson = ({ latitude, longitude, heading }) => {
    const arrowAngle = heading;
    const length = 0.0001;

    const f = (a, l) => [
      longitude + l * Math.cos((a * Math.PI) / 180) * 1.2,
      latitude + l * Math.sin((a * Math.PI) / 180) * 0.9
    ];

    const arrowEnd = f(arrowAngle, length);

    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [longitude, latitude],
              arrowEnd,
              f(arrowAngle + 20, length * 1.2),
              [longitude, latitude],
              f(arrowAngle - 20, length * 1.2),
              arrowEnd
            ]
          }
        }
      ]
    };
  };

  const layerStyle = {
    id: 'arrow',
    type: 'line',
    paint: {
      'line-color': 'orange',
      'line-width': 4,
      'line-opacity': 0.5,
      'line-translate': [0, -5]
    }
  };
  return (
    <Source type="geojson" data={geojson(coordinates)}>
      <Layer id={id || uniqueId()} {...layerStyle} />
    </Source>
  );
};

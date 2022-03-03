import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants/plugins';
import './style.css';

// TODO: set in env
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmF0aWhrYWFuIiwiYSI6ImNremF6MHg1bjBnc2oyb3M2bmhxcXNlc3EifQ.StZVKUOK3pkk3IflnaHlKQ';

const workshop = {
  latitude: 40.810114473678,
  longitude: 29.357002765392842
};

const CustomMarker = ({ coordinates, text, color }) =>
  coordinates ? (
    <Marker {...coordinates} anchor="top">
      <Marker {...coordinates} color={color} />
      {text}
    </Marker>
  ) : (
    ''
  );

const PointMarker = ({ coordinates }) => {
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
    <Source id="my-data" type="geojson" data={geojson(coordinates)}>
      <Layer {...layerStyle} />
    </Source>
  );
};

function NavigationMap() {
  const { message } = useSubscribeTopic('/fix', 500);
  const [current, setCurrent] = useState(null);
  const { setOnline, setOffline } = usePluginState(PLUGIN_KEYS.MAP);
  const { data: waypoints } = usePluginState(PLUGIN_KEYS.WAYPOINTS);
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);

  useEffect(() => {
    if (message) {
      setCurrent({ latitude: message.latitude, longitude: message.longitude });
      setOnline();
    } else {
      setOffline();
    }
  }, [message]);

  return (
    <Map
      initialViewState={{
        ...workshop,
        zoom: 17,
        pitch: 65,
        bearing: 80
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <CustomMarker coordinates={initialCoordinates} text={'(0,0)'} />
      {current && <PointMarker coordinates={current} />}
      {waypoints?.waypointList.map(({ latitude, longitude, x, y, type }) => (
        <>
          <CustomMarker
            coordinates={{ latitude, longitude }}
            text={`(${x.toFixed(1)},${y.toFixed(1)})`}
            color={'red'}
          />
        </>
      ))}
      <NavigationControl visualizePitch />
    </Map>
  );
}

export default NavigationMap;

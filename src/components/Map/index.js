import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants/plugins';
import './style.css';
import Arc22Map from './Arc22Map';

// TODO: set in env
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmF0aWhrYWFuIiwiYSI6ImNremF6MHg1bjBnc2oyb3M2bmhxcXNlc3EifQ.StZVKUOK3pkk3IflnaHlKQ';

const workshop = {
  latitude: 40.810114473678,
  longitude: 29.357002765392842
};

const itu = {
  latitude: 41.10119431695273,
  longitude: 29.02074299188313
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
  const { setOnline, setOffline, data, setData } = usePluginState(
    PLUGIN_KEYS.MAP
  );
  const { data: waypoints } = usePluginState(PLUGIN_KEYS.WAYPOINTS);
  const { data: markers } = usePluginState(PLUGIN_KEYS.MARKERS);
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
        ...itu,
        zoom: 17,
        pitch: 65,
        bearing: 80
      }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      // mapStyle="mapbox://styles/mapbox/dark-v10"
      // mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {data?.settings?.showImageMap && <Arc22Map />}
      <CustomMarker coordinates={initialCoordinates} text={'(0,0)'} />
      {current && <PointMarker coordinates={current} />}
      {waypoints?.waypointList?.map(({ latitude, longitude, x, y, type }) => (
        <>
          <CustomMarker
            coordinates={{ latitude, longitude }}
            text={`(${x.toFixed(1)},${y.toFixed(1)})`}
            color={'red'}
          />
        </>
      ))}
      {markers?.markerList?.map(({ latitude, longitude, x, y, type }) => (
        <>
          <CustomMarker
            coordinates={{ latitude, longitude }}
            text={type}
            color={'red'}
          />
        </>
      ))}
      <NavigationControl visualizePitch />
    </Map>
  );
}

export default NavigationMap;

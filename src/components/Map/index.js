import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';
import './style.css';
import { MarsField } from './Arc22Map';
import { CustomMarker, PointMarker } from './Markers';
import useMessage from '../../hooks/useMessage';

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

function NavigationMap() {
  const { message } = useMessage(PLUGIN_KEYS.MAP, '/ublox/fix', 1000);
  const [current, setCurrent] = useState(null);
  const { setOnline, setOffline, data, setData } = usePluginState(
    PLUGIN_KEYS.MAP
  );
  const { data: waypoints } = usePluginState(PLUGIN_KEYS.WAYPOINTS);
  const { data: markers } = usePluginState(PLUGIN_KEYS.MARKERS);
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const isArc22MarsFieldVisible = data?.settings?.arc22MarsField;
  const isEditMode = data?.settings?.editMode;
  const isSatellite = data?.settings?.satellite;

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
      onZoomEnd={(e) => setData({ ...data, zoom: e.target.getZoom() })}
      initialViewState={{
        ...workshop,
        zoom: 17,
        pitch: 65,
        bearing: 80
      }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      // mapStyle="mapbox://styles/mapbox/dark-v10"
      // mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapStyle={`mapbox://styles/mapbox/${
        isSatellite ? 'satellite-v9' : 'light-v10'
      }`}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {isArc22MarsFieldVisible && <MarsField edit={isEditMode} />}
      <CustomMarker coordinates={initialCoordinates} text={'(0,0)'} />
      {current && <PointMarker id="current-marker" coordinates={current} />}
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

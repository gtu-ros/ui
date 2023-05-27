import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';
import './style.css';
import { MarsField } from './Arc22Map';
import { ArrowMarker, CustomMarker, Line, PointMarker } from './Markers';
import useMessage from '../../hooks/useMessage';
import { purple } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { OFFLINE_STYLE } from './constants';
import { UrcMap } from './UrcMap';

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

// mars desert research station
const mdrs = {
  latitude: 38.40633537545838,
  longitude: -110.79179821374495
};

function NavigationMap() {
  const { message } = useMessage(PLUGIN_KEYS.MAP, '/ublox/fix', 1000);
  const [current, setCurrent] = useState(null);
  const { setOnline, setOffline, data, setData } = usePluginState(
    PLUGIN_KEYS.MAP
  );
  const { data: waypoints } = usePluginState(PLUGIN_KEYS.WAYPOINTS);
  const { data: markers, setData: setMarkers } = usePluginState(
    PLUGIN_KEYS.MARKERS
  );
  const { data: orientation } = usePluginState(PLUGIN_KEYS.ORIENTATION);
  const {
    data: initialCoordinates,
    setData: setInitialCoordinates
  } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const isArc22MarsFieldVisible = data?.settings?.arc22MarsField;
  const isEditMode = data?.settings?.editMode;
  const isSatellite = data?.settings?.satellite;
  const isOffline = data?.settings?.offline;

  useEffect(() => {
    if (message) {
      setData({ timestamp: message?.header?.stamp?.secs });
      setCurrent({
        timestamp: message?.header?.stamp?.secs,
        latitude: message.latitude,
        longitude: message.longitude,
        heading:
          (orientation.orientation.z * 180) / Math.PI +
            initialCoordinates?.headingCalibration || 0
      });
      setOnline();
    } else {
      setOffline();
    }
  }, [message, initialCoordinates]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.lngLat;
    navigator.clipboard.writeText(`${lat} ${lng}`);
    toast(`${lat} ${lng}`, { autoClose: true });
  };

  const getStyle = () => {
    const styles = {
      satellite: 'mapbox://styles/mapbox/satellite-v9',
      default: 'mapbox://styles/mapbox/light-v10',
      offline: OFFLINE_STYLE
    };

    switch (true) {
      case isSatellite:
        return styles.satellite;
      case isOffline:
        return styles.offline;
      default:
        return styles.default;
    }
  };

  return (
    <Map
      cursor="crosshair"
      onClick={handleMapClick}
      onZoomEnd={(e) => setData({ ...data, zoom: e.target.getZoom() })}
      initialViewState={{
        ...mdrs,
        zoom: 17,
        pitch: 65,
        bearing: 80
      }}
      mapStyle={getStyle()}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {isArc22MarsFieldVisible && <MarsField edit={isEditMode} />}
      <UrcMap />
      <CustomMarker
        coordinates={initialCoordinates}
        onDragEnd={(v) =>
          setInitialCoordinates({
            latitude: v.lngLat.lat,
            longitude: v.lngLat.lng
          })
        }
        text={'(0,0)'}
      />
      {current && <PointMarker id="current-marker" coordinates={current} />}
      {current && (
        <ArrowMarker id="current-arrow-marker" coordinates={current} />
      )}
      {waypoints?.waypointList?.map(({ latitude, longitude, x, y, type }) => (
        <>
          <CustomMarker
            coordinates={{ latitude, longitude }}
            text={`(${x.toFixed(1)},${y.toFixed(1)})`}
            color={'red'}
          />
        </>
      ))}
      {markers?.markerList?.map(({ latitude, longitude, x, y, name }) => (
        <>
          <CustomMarker
            coordinates={{ latitude, longitude }}
            text={name}
            color={purple[200]}
          />
        </>
      ))}
      {current && markers?.focused && (
        <Line start={current} end={markers.focused} />
      )}
      <NavigationControl visualizePitch />
    </Map>
  );
}

export default NavigationMap;

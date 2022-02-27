import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';

// TODO: set in env
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZmF0aWhrYWFuIiwiYSI6ImNremF6MHg1bjBnc2oyb3M2bmhxcXNlc3EifQ.StZVKUOK3pkk3IflnaHlKQ';

const workshop = {
  latitude: 40.810114473678,
  longitude: 29.357002765392842
};

function NavigationMap() {
  const { message } = useSubscribeTopic('/fix', 500);
  console.log({ message });

  const current = { latitude: 40.812114473678, longitude: 29.357002765392842 };

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
      <Marker {...workshop} color="red" />
      <Marker {...current} color="blue" />
      <NavigationControl visualizePitch />
    </Map>
  );
}

export default NavigationMap;

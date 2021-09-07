import { Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

// import Map, { Marker } from 'react-canvas-map';

import Map, { Marker } from '../dep/react-canvas-map/src';

const Navigation = (props) => {
  const markerImage = new Image();
  markerImage.src = './static/marker-yellow.svg';
  // markerImage.src = './static/next.svg';
  const navigationMapId = 'navigation-map';

  const offset = { x: 2773, y: 1996 };
  const scale = 71;
  // const path = [
  //   { x: 0, y: 0 },
  //   { x: 8.37, y: -6.26 },
  //   { x: 34, y: 1.5 },
  //   { x: 30.77, y: -5.3 },
  //   { x: 9.8, y: 0 }
  // ];
  const path = [
    { x: 0, y: 0, rotation: 0 },
    { x: 1, y: 0, rotation: 90},
    { x: 2, y: 0, rotation: 180},
    { x: 3, y: 0, rotation: 270},
    { x: 4, y: 0, rotation: 180},
  ];
  const [markers, setMarkers] = useState(
    path.map((coords) => {
      return {
        x: -coords.x * scale + offset.x,
        y: coords.y * scale + offset.y,
        rotation: coords.rotation
      };
    })
  );
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const div = document.getElementById(navigationMapId);
    const deg = rotation;

    div.style.webkitTransform = 'rotate(' + deg + 'deg)';
    div.style.mozTransform = 'rotate(' + deg + 'deg)';
    div.style.msTransform = 'rotate(' + deg + 'deg)';
    div.style.oTransform = 'rotate(' + deg + 'deg)';
    div.style.transform = 'rotate(' + deg + 'deg)';
  }, [rotation]);

  return (
    <>
      <div id={navigationMapId} style={{ height: '90vh' }}>
        <Map image="./static/map.png">
          {markers.map((marker, markerIndex) => {
            return (
              <Marker
                key={`marker-${markerIndex}`}
                markerKey={`marker-${markerIndex}`}
                coords={marker}
                image={markerImage}
              />
            );
          })}
        </Map>
      </div>
      <div style={{ margin: 20 }}>
        <Slider
          value={rotation}
          onChange={(_, newValue) => setRotation(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={360}
        />
      </div>
    </>
  );
};

export default Navigation;

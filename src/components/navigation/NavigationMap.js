import { Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

// import Map, { Marker } from 'react-canvas-map';

import Map, { Marker } from '../../dep/react-canvas-map/src';

import { zed2Odom } from '../../services/RosService';
import * as THREE from 'three';

const NavigationMap = (props) => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);

  // const updateWidthAndHeight = () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', updateWidthAndHeight);
  //   return () => window.removeEventListener('resize', updateWidthAndHeight);
  // });

  const markerImage = new Image();
  const roverImage = new Image();
  markerImage.src = './static/marker-yellow.svg';
  roverImage.src = './static/next.svg';
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
    { x: 0, y: 0, rotation: 180 },
    { x: 0.5, y: 0, rotation: 180 },
    { x: 1, y: 0, rotation: 180 },
    { x: 1.5, y: 0, rotation: 180 },
    { x: 2, y: 0.1, rotation: 170 },
    { x: 2.5, y: 0.2, rotation: 160 },
    { x: 3, y: 0.2, rotation: 160 },
    { x: 3.5, y: 0.3, rotation: 150 }
  ];
  // const [path, setPath] = useState([]);

  const [markers, setMarkers] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [odomListenerState, setOdomListenerState] = useState(null);
  const [odom, setOdom] = useState(null);

  const diff = ({ x1, y1 }, { x2, y2 }) => {
    return Math.sqrt(Math.abs(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
  };

  const odomCallback = (message) => {
    if (message.header.seq % 3 === 0) {
      // console.log(message);
      // if (odom) {
      //   console.log('x:', diff(message.pose.pose.position, odom.position));
      //   if (diff(message.pose.pose.position, odom.position) < 0.1) return;
      // }
      const quaternion = new THREE.Quaternion();
      quaternion.copy(message.pose.pose.orientation);
      // console.log(new THREE.Euler().setFromQuaternion(quaternion));
      setOdom({
        position: message.pose.pose.position,
        orientation: new THREE.Euler().setFromQuaternion(quaternion)
      });
    }
  };

  useEffect(() => {
    setOdomListenerState(zed2Odom());
  }, []);

  // useEffect(() => {
  //   if (odom)
  //     setPath([
  //       ...path,
  //       {
  //         x: odom.position.x,
  //         y: odom.position.y,
  //         rotation: -odom.orientation.z
  //       }
  //     ]);
  // }, [odom]);

  useEffect(() => {
    setMarkers(
      path.map((coords) => {
        return {
          x: -coords.x * scale + offset.x,
          y: coords.y * scale + offset.y,
          rotation: coords.rotation
        };
      })
    );
  }, [path]);

  useEffect(() => {
    if (odomListenerState) odomListenerState.subscribe(odomCallback);
    return () => odomListenerState?.unsubscribe();
  }, [odomListenerState]);

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
            if (markerIndex === markers.length - 1) {
              return (
                <Marker
                  key={`marker-${markerIndex}`}
                  markerKey={`marker-${markerIndex}`}
                  coords={marker}
                  image={roverImage}
                />
              );
            }
            return (
              <Marker
                key={`marker-${markerIndex}`}
                markerKey={`marker-${markerIndex}`}
                coords={marker}
                image={markerImage}
              />
            );
          })}
          {/* <Marker
            key={`roverId`}
            markerKey={`roverId`}
            coords={{
              x: odom.position.x,
              y: odom.position.y,
              rotation: odom.rotation.z
            }}
            image={roverImage}
          /> */}
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

export default NavigationMap;

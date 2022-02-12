import { Fab, IconButton, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import GetAppIcon from '@mui/icons-material/GetApp';
import PublishIcon from '@mui/icons-material/Publish';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import TimelineIcon from '@mui/icons-material/Timeline';

// import Map, { Marker } from 'react-canvas-map';

import Map, { Marker } from '../../dep/react-canvas-map/src';

import { zed2Odom } from '../../services/RosService';
import * as THREE from 'three';
import { navigationMapConfig } from '../../utils/constants';

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

  const offset = navigationMapConfig.map.offset;
  const scale = navigationMapConfig.map.scale;
  // const path = [
  //   { x: 0, y: 0 },
  //   { x: 8.37, y: -6.26 },
  //   { x: 34, y: 1.5 },
  //   { x: 30.77, y: -5.3 },
  //   { x: 9.8, y: 0 }
  // ];

  const pathEx = [
    { x: 0, y: 0, rotation: 180 },
    { x: 0.5, y: 0, rotation: 180 },
    { x: 1, y: 0, rotation: 180 },
    { x: 1.5, y: 0, rotation: 180 },
    { x: 2, y: 0.1, rotation: 170 },
    { x: 2.5, y: 0.2, rotation: 160 },
    { x: 3, y: 0.2, rotation: 160 },
    { x: 3.5, y: 0.3, rotation: 150 }
  ];
  // const [path, setPath] = useState(pathEx);
  const [path, setPath] = useState([]);

  // const [markers, setMarkers] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [odomListenerState, setOdomListenerState] = useState(null);
  const [odom, setOdom] = useState(null);
  const [pathSlicer, setPathSlicer] = useState(0); // 0: disable slicing

  const diff = ({ x1, y1 }, { x2, y2 }) => {
    return Math.sqrt(Math.abs(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
  };

  const odomCallback = (message) => {
    if (message.header.seq % navigationMapConfig.odomPeriod === 0) {
      const quaternion = new THREE.Quaternion();
      quaternion.copy(message.pose.pose.orientation);
      setOdom({
        position: message.pose.pose.position,
        orientation: new THREE.Euler().setFromQuaternion(quaternion)
      });
    }
  };

  useEffect(() => {
    setOdomListenerState(zed2Odom());
  }, []);

  useEffect(() => {
    if (odom)
      setPath([
        ...path,
        {
          x: odom.position.x,
          y: odom.position.y,
          rotation: -odom.orientation.z
        }
      ]);
  }, [odom]);

  const getMarkers = (n) => {
    const markers = path.map((coords) => {
      return {
        x: -coords.x * scale + offset.x,
        y: coords.y * scale + offset.y,
        rotation: coords.rotation
      };
    });
    if (n === 0) return markers;
    return markers.slice(0, n);
  };

  const noMarkers = (n) => path.length;

  // useEffect(() => {
  //   setMarkers(
  //     path.map((coords) => {
  //       return {
  //         x: -coords.x * scale + offset.x,
  //         y: coords.y * scale + offset.y,
  //         rotation: coords.rotation
  //       };
  //     })
  //   );
  // }, [path]);

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

  const loadMap = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const content = fileReader.result;
      const pathFromFile = JSON.parse(content);
      console.log(pathFromFile);
      setPath(pathFromFile);
    };
    fileReader.readAsText(file);
  };

  const saveMap = () => {
    const timestamp = Date.now();
    saveImage(timestamp);
    const data = path;
    const fileName = `path-${timestamp}.json`;
    const fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
      type: 'application/json'
    });
    saveAs(fileToSave, fileName);
  };

  const saveImage = (timestamp) => {
    const canvas = document
      .getElementById('navigation-map')
      .getElementsByTagName('canvas')[0];

    canvas.toBlob(function (blob) {
      saveAs(blob, `map-${timestamp}.png`);
    });
  };

  return (
    <>
      <Fab
        size="small"
        color="primary"
        onClick={saveMap}
        style={{ position: 'fixed', right: 10, top: 10, zIndex: 99 }}
      >
        <GetAppIcon />
      </Fab>
      <Fab
        size="small"
        color="primary"
        onClick={() => document.getElementById('file-reader').click()}
        style={{ position: 'fixed', right: 60, top: 10, zIndex: 99 }}
      >
        <input
          hidden
          id="file-reader"
          type="file"
          accept=".json"
          onChange={(e) => loadMap(e.target.files[0])}
        />
        <PublishIcon />
      </Fab>
      <div id={navigationMapId} style={{ height: '90vh' }}>
        <Map id="navigation-map" image="./static/map.png">
          {getMarkers(pathSlicer).map((marker, markerIndex) => {
            if (
              markerIndex === noMarkers() - 1 ||
              (pathSlicer !== 0 && markerIndex === pathSlicer - 1)
            ) {
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
        </Map>
      </div>
      <div style={{ margin: '0px 10px' }}>
        <div style={{ display: 'flex' }}>
          <IconButton style={{ marginRight: '8px' }}>
            <RotateLeftIcon onClick={() => setRotation(0)} />
          </IconButton>
          <Slider
            style={{ marginTop: 10 }}
            value={rotation}
            onChange={(_, newValue) => setRotation(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={360}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <IconButton style={{ marginRight: '8px' }}>
            <TimelineIcon onClick={() => setPathSlicer(0)} />
          </IconButton>
          <Slider
            style={{ marginTop: 10 }}
            value={pathSlicer}
            onChange={(_, newValue) => setPathSlicer(newValue)}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={path.length}
          />
        </div>
      </div>
    </>
  );
};

export default NavigationMap;

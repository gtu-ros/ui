import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tfClientToFrame, viewer3d, urdfClient } from '../services/RosService';
import { Grid } from 'ros3d';
import * as THREE from 'three';

export const ModelVisualizer = (props) => {
  const viewerDivId = 'urdf';

  const [tfClient, setTfClient] = useState(null);
  const [viewer3dState, setViewer3dState] = useState(null);
  const [urdfClientState, setUrdfClientState] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  useEffect(() => {
    let viewer3dTmp = viewer3d(
      viewerDivId,
      props.width || width,
      props.height || height,
      props.cameraPosition
    );

    viewer3dTmp.addObject(new Grid());
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    viewer3dTmp.camera.add(pointLight);
    viewer3dTmp.scene.add(viewer3dTmp.camera);
    setViewer3dState(viewer3dTmp);
    let tfClientTmp = tfClientToFrame(props.targetFrame, props.tfRate);
    setTfClient(tfClientTmp);
    setUrdfClientState(urdfClient(tfClientTmp, viewer3dTmp, props.urdfPath));
    return () => {
      urdfClientState?.unsubscribe();
      tfClient?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    viewer3dState?.resize(width, height);
  }, [width, height]);

  return (
    <div>
      <div id={viewerDivId}></div>
    </div>
  );
};

ModelVisualizer.propTypes = {
  urdfPath: PropTypes.string.isRequired,
  targetFrame: PropTypes.string.isRequired,
  tfRate: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cameraPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired
  })
};

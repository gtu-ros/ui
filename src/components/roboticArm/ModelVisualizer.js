import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Viewer } from 'ros3d';
import * as THREE from 'three';
import { useResizeDetector } from 'react-resize-detector';
import nextId from 'react-id-generator';
import useRosWs from '../../hooks/useRosWs';

export const ModelVisualizer = (props) => {
  const { tfClientToFrame, urdfClient } = useRosWs();
  const viewerDivId = nextId('urdf');
  const [tfClient, setTfClient] = useState(null);
  const [viewer3dState, setViewer3dState] = useState(null);
  const [urdfClientState, setUrdfClientState] = useState(null);
  const { width, height, ref } = useResizeDetector();

  const viewer3d = (divId, width, height, cameraPosition) => {
    return new Viewer({
      divID: divId,
      width: width,
      height: height,
      antialias: true,
      cameraPose: cameraPosition
    });
  };

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
    if (props.width && props.height) return;
    viewer3dState?.resize(width, height);
  }, [width, height]);

  return (
    <div
      style={{ height: '100%', maxHeight: 1080, maxWidth: 1920 }}
      ref={ref}
      id={viewerDivId}
    ></div>
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

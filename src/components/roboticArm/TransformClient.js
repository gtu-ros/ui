import React from 'react';
import PropTypes from 'prop-types';
import { tfClientToFrame } from '../../services/RosService';
import * as THREE from 'three';
import {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer
} from '../../dep/react-flight-indicators/src';
import { Grid, Typography } from '@material-ui/core';
import Title from '../Title';

export class TransformClient extends React.Component {
  float_precision = 3;

  getEuler = () => {
    const quaternion = new THREE.Quaternion();
    quaternion.copy(this.state.transform.rotation);
    // return new THREE.Euler().setFromQuaternion(quaternion, "ZYX");
    return new THREE.Euler().setFromQuaternion(quaternion);
  };

  constructor(props) {
    super(props);

    this.state = {
      tfClient: null,
      transform: null
    };
  }

  componentDidMount() {
    this.setState(
      {
        tfClient: tfClientToFrame(this.props.targetFrame, this.props.tfRate)
      },
      () => {
        this.state.tfClient.subscribe(
          this.props.sourceFrame,
          this.pandaWorldTransformCallback
        );
      }
    );
  }

  componentWillUnmount() {
    this.state.tfClient.unsubscribe(this.props.targetFrame);
  }

  pandaWorldTransformCallback = (message) => {
    this.setState({
      transform: {
        translation: message.translation,
        rotation: message.rotation
      }
    });
  };

  render() {
    // capture variable for lambda functions
    const float_precision = this.float_precision;
    let roll, pitch, yaw;
    if (this.state.transform) {
      roll = (this.getEuler().z * 180) / Math.PI;
      pitch = (this.getEuler().x * 180) / Math.PI + 90;
      yaw = (this.getEuler().y * 180) / Math.PI;
    }
    return (
      <div>
        {this.state.transform ? (
          <div>
            <Title>
              {this.props.sourceFrame} - {this.props.targetFrame} transform
            </Title>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div>
                  <AttitudeIndicator
                    roll={roll}
                    pitch={pitch}
                    showBox={false}
                    size={300}
                  />
                  <div>X: {roll.toFixed(float_precision)}</div>
                  <div>Y: {pitch.toFixed(float_precision)}</div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <HeadingIndicator heading={yaw} showBox={false} size={300} />
                <div>Z: {yaw.toFixed(float_precision)}</div>
              </Grid>
            </Grid>

            {/* <h3>translation</h3>
            <span>
              x: {this.state.transform.translation.x.toFixed(float_precision)}{' '}
            </span>
            <span>
              y: {this.state.transform.translation.y.toFixed(float_precision)}{' '}
            </span>
            <span>
              z: {this.state.transform.translation.z.toFixed(float_precision)}{' '}
            </span> */}
          </div>
        ) : null}
      </div>
    );
  }
}

TransformClient.propTypes = {
  targetFrame: PropTypes.string.isRequired,
  sourceFrame: PropTypes.string.isRequired,
  tfRate: PropTypes.number.isRequired
};

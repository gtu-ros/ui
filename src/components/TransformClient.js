import React from 'react';
import PropTypes from 'prop-types';
import { tfClientToFrame } from '../services/RosService';
import * as THREE from 'three';
import {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer
} from '../dep/react-flight-indicators/src';

export class TransformClient extends React.Component {
  float_precision = 3;

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

    if (this.state.transform)
      var r = new THREE.Euler().setFromQuaternion(
        this.state.transform?.rotation
      );

    return (
      <div>
        <AttitudeIndicator
          roll={(Math.random() - 0.5) * 120}
          pitch={(Math.random() - 0.5) * 40}
          showBox={false}
        />
        <HeadingIndicator heading={Math.random() * 360} showBox={false} />
        {this.state.transform ? (
          <div>
            <h2>
              {this.props.sourceFrame} to {this.props.targetFrame} transform:
            </h2>

            <h3>translation</h3>
            <span>
              x: {this.state.transform.translation.x.toFixed(float_precision)}{' '}
            </span>
            <span>
              y: {this.state.transform.translation.y.toFixed(float_precision)}{' '}
            </span>
            <span>
              z: {this.state.transform.translation.z.toFixed(float_precision)}{' '}
            </span>

            <h3>rotation</h3>
            <span>
              x: {this.state.transform.rotation.x.toFixed(float_precision)}{' '}
            </span>
            <span>
              y: {this.state.transform.rotation.y.toFixed(float_precision)}{' '}
            </span>
            <span>
              z: {this.state.transform.rotation.z.toFixed(float_precision)}{' '}
            </span>
            <span>
              w: {this.state.transform.rotation.w.toFixed(float_precision)}{' '}
            </span>
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

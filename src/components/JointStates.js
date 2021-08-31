import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  jogJoint,
  jogMessage,
  JointStatesListener
} from '../services/RosService';
import { Divider, Grid, IconButton, Slider } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { eventLoop, jointConfig } from '../utils/constants';

export const JointStates = (props) => {
  const float_precision = 3;

  const [jointStatesListenerState, setJointStatesListenerState] =
    useState(null);
  const [jointStates, setJointStates] = useState(null);
  const keyState = {};
  const [speed, setSpeed] = useState(1);

  const jointStatesCallback = (message) => {
    setJointStates({
      name: message.name,
      position: message.position,
      effort: message.effort,
      velocity: message.velocity,
      frame_id: message.header.frame_id
    });
  };

  // set callback in initial render
  useEffect(() => {
    setJointStatesListenerState(JointStatesListener(props.topic));
  }, []);

  useEffect(() => {
    if (jointStatesListenerState)
      jointStatesListenerState.subscribe(jointStatesCallback);
    return () => jointStatesListenerState?.unsubscribe();
  }, [jointStatesListenerState]);

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (e) => {
        // console.log(e);
        keyState[e.key] = true;
      },
      true
    );
    window.addEventListener(
      'keyup',
      (e) => {
        // console.log(e);
        keyState[e.key] = false;
      },
      true
    );

    const keyEventLoop = () => {
      for (const [joint, control] of Object.entries(jointConfig.joints)) {
        if (keyState[control.increase]) {
          console.log(`${joint}: +`);
          jogJoint.publish(jogMessage(joint, jointConfig.movementStep * speed));
        }
        if (keyState[control.decrease]) {
          console.log(`${joint}: -`);
          jogJoint.publish(jogMessage(joint, -jointConfig.movementStep * speed));
        }
      }
      setTimeout(keyEventLoop, eventLoop.timeout);
    };
    keyEventLoop();
  }, []);

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
    console.log(speed);
  };

  const rows = [];

  if (jointStates) {
    for (let i = 0; i < jointStates.name.length; ++i) {
      if (jointConfig.hide.includes(jointStates.name[i])) continue;
      rows.push({
        name: jointStates.name[i],
        position: jointStates.position[i],
        delta: 0,
        decrease: () => jogJoint.publish(jogMessage(jointStates.name[i], -0.1)),
        increase: () => jogJoint.publish(jogMessage(jointStates.name[i], 0.1))
      });
    }
  }

  return (
    <div>
      {jointStates ? (
        <>
          <Grid container spacing={3}>
            {rows.map((value, index) => {
              return (
                <>
                  <Grid xs={4}>{value.name}</Grid>
                  <Grid xs={2}>{value.position.toFixed(float_precision)}</Grid>
                  <Grid xs={4}>
                    <Slider
                      value={value.position.toFixed(float_precision)}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={-2} // TODO: set min max in config
                      max={2}
                    />
                  </Grid>
                  <Grid xs={2}>
                    <IconButton color="secondary" size="small">
                      <RemoveCircleIcon onClick={value.decrease} />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <AddCircleIcon onClick={value.increase} />
                    </IconButton>
                  </Grid>
                  <Divider />
                </>
              );
            })}
          </Grid>
        </>
      ) : null}
      <Grid container spacing={3}>
        <Grid xs={4}>Speed</Grid>
        <Grid xs={4}>
          <Slider
            value={speed}
            onChange={handleSpeedChange}
            valueLabelDisplay="auto"
            step={1} // TODO: set in config
            marks
            min={1}
            max={10}
          />
        </Grid>
        <Grid xs={2}>
          <IconButton color="secondary" size="small">
            <RemoveCircleIcon
              onClick={() => {
                setSpeed(speed - 1);
              }}
            />
          </IconButton>
          <IconButton color="primary" size="small">
            <AddCircleIcon
              onClick={() => {
                setSpeed(speed + 1);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

JointStates.propTypes = {
  topic: PropTypes.string.isRequired
};

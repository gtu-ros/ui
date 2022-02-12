import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  jogJoint,
  jogMessage,
  JointStatesListener
} from '../../services/RosService';
import { Divider, Grid, IconButton, Slider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { eventLoop, jointConfig } from '../../utils/constants';
import { KeyPress } from './KeyPress';
import Title from '../Title';

export const JointStates = (props) => {
  const float_precision = 2;

  const [jointStatesListenerState, setJointStatesListenerState] =
    useState(null);
  const [jointStates, setJointStates] = useState(null);
  // const keyState = {};
  const [keyState, setKeyState] = useState({});
  const [speed, setSpeed] = useState(jointConfig.speed.initialSpeed);

  const jointStatesCallback = (message) => {
    // console.log(message);
    if (message.header.seq % jointConfig.period === 0) {
      setJointStates({
        name: message.name,
        position: message.position,
        frame_id: message.header.frame_id
      });
    }
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

  const handleKeyDown = (e) => {
    // console.log(e);
    // keyState[e.key] = true;
    // setKeyState({ ...keyState, [e.key]: true });
    setKeyState({ [e.key]: true });
  };

  const handleKeyUp = (e) => {
    // console.log(e);
    // keyState[e.key] = false;
    // setKeyState({ ...keyState, [e.key]: false });
    setKeyState({ [e.key]: false });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let timer;
    const keyEventLoop = () => {
      // console.log(keyState);
      for (const [joint, control] of Object.entries(jointConfig.joints)) {
        // console.log(keyState);
        if (keyState[control.increase]) {
          console.log(`${joint}: +`);
          jogJoint.publish(jogMessage(joint, jointConfig.movementStep * speed));
        }
        if (keyState[control.decrease]) {
          console.log(`${joint}: -`);
          jogJoint.publish(
            jogMessage(joint, -jointConfig.movementStep * speed)
          );
        }
      }
      timer = setTimeout(keyEventLoop, eventLoop.timeout);
    };
    keyEventLoop();
    return () => clearTimeout(timer);
  }, [keyState]);

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
        // position: jointStates.position[i],
        position: jointStates.position[i] * (180 / Math.PI),
        decrease: () =>
          jogJoint.publish(
            jogMessage(jointStates.name[i], -jointConfig.movementStep * speed)
          ),
        increase: () =>
          jogJoint.publish(
            jogMessage(jointStates.name[i], jointConfig.movementStep * speed)
          )
      });
    }
  }

  return (
    <>
      <Title>Joint States</Title>
      <div style={{ padding: '20px' }}>
        {jointStates ? (
          <>
            <Grid
              container
              spacing={3}
              style={{ paddingTop: '20px !important' }}
            >
              {rows.map((value, index) => {
                return (
                  <>
                    <Grid
                      style={{ textAlign: 'left', paddingBottom: 18 }}
                      xs={2}
                    >
                      {value.name}
                    </Grid>
                    <Grid xs={2}>
                      {value.position.toFixed(float_precision)}
                    </Grid>
                    <Grid xs={6}>
                      <Slider
                        value={value.position.toFixed(float_precision)}
                        valueLabelDisplay="auto"
                        // step={0.1}
                        // marks
                        min={jointConfig.angles.min}
                        max={jointConfig.angles.max}
                      />
                    </Grid>
                    <Grid xs={2}>
                      <>
                        <KeyPress
                          keyName={jointConfig.joints[value.name]?.decrease}
                          highlight={
                            keyState[jointConfig.joints[value.name]?.decrease]
                          }
                        />
                        <IconButton color="secondary" size="small">
                          <RemoveCircleIcon onClick={value.decrease} />
                        </IconButton>
                        <IconButton color="primary" size="small">
                          <AddCircleIcon onClick={value.increase} />
                        </IconButton>
                        <KeyPress
                          keyName={jointConfig.joints[value.name]?.increase}
                          highlight={
                            keyState[jointConfig.joints[value.name]?.increase]
                          }
                        />
                      </>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        ) : null}
        <Grid
          container
          spacing={3}
          style={{ paddingTop: 50, textAlign: 'left' }}
        >
          <Grid xs={2}>Speed</Grid>
          <Grid xs={2}>{speed}</Grid>
          <Grid xs={6}>
            <Slider
              value={speed}
              onChange={handleSpeedChange}
              valueLabelDisplay="auto"
              step={jointConfig.speed.step} // TODO: set in config
              marks
              min={jointConfig.speed.min}
              max={jointConfig.speed.max}
            />
          </Grid>
          <Grid xs={2}>
            <div style={{ marginLeft: 50 }}>
              <IconButton color="secondary" size="small">
                <RemoveCircleIcon
                  onClick={() => {
                    setSpeed(speed - jointConfig.speed.step);
                  }}
                />
              </IconButton>
              <IconButton color="primary" size="small">
                <AddCircleIcon
                  onClick={() => {
                    setSpeed(speed + jointConfig.speed.step);
                  }}
                />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

JointStates.propTypes = {
  topic: PropTypes.string.isRequired
};

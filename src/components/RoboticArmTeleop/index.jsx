import usePublisher from '../../hooks/usePublisher';

import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Slider,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { RotateLeft, Speed } from '@mui/icons-material';
import { KeyPress } from '../roboticArm/KeyPress';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const config = {
  joints: [
    {
      name: 'omuz',
      decrease: 'q',
      increase: 'a'
    },
    {
      name: 'base',
      decrease: '1',
      increase: '2'
    },
    {
      name: 'bilek',
      decrease: 'd',
      increase: 'e'
    },
    {
      name: 'dirsek',
      decrease: 'w',
      increase: 's'
    },
    {
      name: '-----',
      decrease: 'o',
      increase: 'p'
    },
    {
      name: 'gripper',
      decrease: 'z',
      increase: 'x'
    },
    {
      name: 'vidalama',
      decrease: 'g',
      increase: 't'
    },
    {
      name: 'bilek asagi yukari',
      decrease: 'h',
      increase: 'y'
    }
  ],
  message: {
    stop: 0,
    increase: 1,
    decrease: 2
  }
};

export default () => {
  const { joints } = config;
  const [active, setActive] = useState(false);
  const [keyState, setKeyState] = useState({});

  const keys = joints.reduce(
    (acc, curr) => [...acc, curr.increase, curr.decrease],
    []
  );

  const [publish] = usePublisher({
    name: '/arm_keyboard',
    type: 'std_msgs/Int16MultiArray'
  });

  const stop = () => {
    console.log('asdf');
    publish({
      data: joints.map((_) => 0)
    });
  };

  const handleActivate = () => {
    setActive(!active);
  };

  const getMessageFromState = (keyState) =>
    joints.map((j) => {
      if (keyState[j.increase] && keyState[j.decrease])
        return config.message.stop;
      if (keyState[j.increase]) return config.message.increase;
      if (keyState[j.decrease]) return config.message.decrease;
      return config.message.stop;
    });

  useEffect(() => {
    const message = getMessageFromState(keyState);
    publish({
      data: message
    });
  }, [keyState]);

  return (
    <Stack m={2} spacing={1}>
      <Stack gap={2} direction={'row'} alignItems="center">
        <Switch onChange={handleActivate} checked={active} />
        <pre>{JSON.stringify(getMessageFromState(keyState))}</pre>
      </Stack>
      <KeyboardEventHandler
        isDisabled={!active}
        handleEventType="keydown"
        handleKeys={keys}
        onKeyEvent={(key, e) => {
          setKeyState({ ...keyState, [e.key]: true });
        }}
      />
      <KeyboardEventHandler
        isDisabled={!active}
        handleEventType="keyup"
        handleKeys={keys}
        onKeyEvent={(key, e) => {
          setKeyState({ ...keyState, [e.key]: false });
        }}
      />
      {joints.map((j) => (
        <>
          <Grid container>
            <Grid item xs={8}>
              <Typography fontWeight={600} variant="p" color="textSecondary">
                {j.name}
              </Typography>
            </Grid>
            <Grid item xs={2} alignItems="center">
              <KeyPress keyName={j.decrease} highlight={keyState[j.decrease]} />
            </Grid>
            <Grid item xs={2}>
              <KeyPress keyName={j.increase} highlight={keyState[j.increase]} />
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}

      <KeyboardEventHandler
        isDisabled={!active}
        handleEventType="keydown"
        handleKeys={['space']}
        onKeyEvent={(key, e) => {
          e.preventDefault();
          stop(key);
        }}
      />

      <Button variant="contained" size="large" color="error" onMouseDown={stop}>
        STOP
      </Button>
    </Stack>
  );
};

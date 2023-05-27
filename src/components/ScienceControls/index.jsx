import React, { useState, useEffect } from 'react';
import './ButtonBox.css';
import { useROS } from 'react-ros';
import ROSLIB, { Param } from 'roslib';
import { Box, Button, Paper, Typography } from '@mui/material';

const ScienceControls = () => {
  const [isValve1On, setIsValve1On] = useState(false);
  const [isValve2On, setIsValve2On] = useState(false);
  const [isValve3On, setIsValve3On] = useState(false);
  const [isValve4On, setIsValve4On] = useState(false);
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [activeMotorButton, setActiveMotorButton] = useState(null);
  const { ros } = useROS();

  const isMotor = new ROSLIB.Param({
    ros: ros,
    name: 'motorToGo'
  });
  const motorFlagParam = new ROSLIB.Param({
    ros: ros,
    name: 'motorFlag'
  });
  const valve1Param = new ROSLIB.Param({
    ros: ros,
    name: 'valve1'
  });
  const valve2Param = new ROSLIB.Param({
    ros: ros,
    name: 'valve2'
  });
  const valve3Param = new ROSLIB.Param({
    ros: ros,
    name: 'valve3'
  });
  const valve4Param = new ROSLIB.Param({
    ros: ros,
    name: 'valve4'
  });
  const pumpParam = new ROSLIB.Param({
    ros: ros,
    name: 'pump'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      valve1Param.get((valve1Val) => {
        setIsValve1On(valve1Val === 0);
      });
      valve2Param.get((valve2Val) => {
        setIsValve2On(valve2Val === 0);
      });
      valve3Param.get((valve3Val) => {
        setIsValve3On(valve3Val === 0);
      });
      valve4Param.get((valve4Val) => {
        setIsValve4On(valve4Val === 0);
      });
      pumpParam.get((pumpVal) => {
        setIsPumpOn(pumpVal === 0);
      });
      isMotor.get((motorVal) => {
        setActiveMotorButton(motorVal);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleA = () => {
    isMotor.set(1);
    motorFlagParam.set(1);
  };

  const handleB = () => {
    isMotor.set(2);
    motorFlagParam.set(1);
  };

  const handleC = () => {
    isMotor.set(3);
    motorFlagParam.set(1);
  };

  const handleD = () => {
    isMotor.set(4);
    motorFlagParam.set(1);
  };

  const handleValve1 = () => {
    setIsValve1On(!isValve1On);
    valve1Param.set(isValve1On ? 1 : 0);
  };

  const handleValve2 = () => {
    setIsValve2On(!isValve2On);
    valve2Param.set(isValve2On ? 1 : 0);
  };

  const handleValve3 = () => {
    setIsValve3On(!isValve3On);
    valve3Param.set(isValve3On ? 1 : 0);
  };

  const handleValve4 = () => {
    setIsValve4On(!isValve4On);
    valve4Param.set(isValve4On ? 1 : 0);
  };

  const handlePump = () => {
    setIsPumpOn(!isPumpOn);
    pumpParam.set(isPumpOn ? 1 : 0);
  };

  return (
    <div>
      <Container title="Motor Direction">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <MotorButton active={activeMotorButton === 1} onClick={handleA}>
            A
          </MotorButton>
          <MotorButton active={activeMotorButton === 2} onClick={handleB}>
            B
          </MotorButton>

          <MotorButton active={activeMotorButton === 3} onClick={handleC}>
            C
          </MotorButton>
          <MotorButton active={activeMotorButton === 4} onClick={handleD}>
            D
          </MotorButton>
        </Box>
      </Container>
      <Container title="Valve Buttons">
        <div>
          <div>
            <button
              className={isValve1On ? 'switch-btn on' : 'switch-btn off'}
              onClick={handleValve1}
            >
              Valve 1
              <span className="slider" />
            </button>
            <button
              className={isValve2On ? 'switch-btn on' : 'switch-btn off'}
              onClick={handleValve2}
            >
              Valve 2
              <span className="slider" />
            </button>
          </div>
          <div>
            <button
              className={isValve3On ? 'switch-btn on' : 'switch-btn off'}
              onClick={handleValve3}
            >
              Valve 3
              <span className="slider" />
            </button>
            <button
              className={isValve4On ? 'switch-btn on' : 'switch-btn off'}
              onClick={handleValve4}
            >
              Valve 4
              <span className="slider" />
            </button>
          </div>
        </div>
      </Container>

      <Container title="Pump Buttons">
        <button
          className={isPumpOn ? 'switch-btn on' : 'switch-btn off'}
          onClick={handlePump}
        >
          PUMP
          <span className="slider" />
        </button>
      </Container>
    </div>
  );
};

const MotorButton = ({ children, active, ...props }) => (
  <Button
    variant="contained"
    size="large"
    color={active === 2 ? 'error' : 'primary'}
    {...props}
  >
    {children}
  </Button>
);

const Container = ({ children, title, ...props }) => (
  <Paper
    sx={{
      p: 1,
      m: 1,
      backgroundColor: (theme) => theme.palette.grey[100]
    }}
  >
    <Typography component="h2" variant="subtitle2" color="secondary">
      {title}
    </Typography>
    {children}
  </Paper>
);

export default ScienceControls;

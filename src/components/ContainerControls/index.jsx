import React, { useState, useEffect } from 'react';
import './ButtonBox.css';
import { useROS } from 'react-ros';
import ROSLIB, { Param } from 'roslib';
import { Box, Button, Paper, Typography } from '@mui/material';

const ContainerControls = () => {
  const [isValve1On, setIsValve1On] = useState(false);
  const [isValve2On, setIsValve2On] = useState(false);
  const { ros } = useROS();

  const valve1Param = new ROSLIB.Param({
    ros: ros,
    name: 'motorState'
  });
  const valve2Param = new ROSLIB.Param({
    ros: ros,
    name: 'motor2State'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      valve1Param.get((valve1Val) => {
        setIsValve1On(valve1Val === 0);
      });
      valve2Param.get((valve2Val) => {
        setIsValve2On(valve2Val === 0);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);


  const handleValve1 = () => {
    setIsValve1On(!isValve1On);
    valve1Param.set(isValve1On ? 1 : 0);
  };

  const handleValve2 = () => {
    setIsValve2On(!isValve2On);
    valve2Param.set(isValve2On ? 1 : 0);
  };

  return (
    <div>
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
        </div>
      </Container>
    </div>
  );
};


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

export default ContainerControls;

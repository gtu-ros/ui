import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridOnIcon from '@mui/icons-material/GridOn';
import VideocamIcon from '@mui/icons-material/Videocam';
import MapIcon from '@mui/icons-material/Map';
import NavigationIcon from '@mui/icons-material/Navigation';
import BiotechIcon from '@mui/icons-material/Biotech';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { cameraConfig } from './constants';
import { Collapse, Divider, List } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';

export const MainListItems = (props) => (
  <div>
    <ListSubheader inset style={{ textAlign: 'left' }}>
      Dashboard
    </ListSubheader>

    <ListItem
      button
      onClick={() => {
        props.setDashboardState(props.dashboardStates.main);
      }}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Main" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        props.setDashboardState(props.dashboardStates.roboticArm);
      }}
    >
      <ListItemIcon>
        <PrecisionManufacturingIcon />
      </ListItemIcon>
      <ListItemText primary="Robotic Arm" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        props.setDashboardState(props.dashboardStates.navigation);
      }}
    >
      <ListItemIcon>
        <NavigationIcon />
      </ListItemIcon>
      <ListItemText primary="Navigation" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        props.setDashboardState(props.dashboardStates.science);
      }}
    >
      <ListItemIcon>
        <BiotechIcon />
      </ListItemIcon>
      <ListItemText primary="Science" />
    </ListItem>

    <Divider />

    <ListSubheader inset style={{ textAlign: 'left' }}>
      Views
    </ListSubheader>

    <ListItem
      button
      onClick={() => {
        window.open(
          `${window.location.origin}/urdf`,
          'urdf',
          'width=640,height=480'
        );
      }}
    >
      <ListItemIcon>
        <GridOnIcon />
      </ListItemIcon>
      <ListItemText primary="URDF" />
    </ListItem>
    <ListItem
      button
      onClick={() => {
        window.open(
          `${window.location.origin}/navigation`,
          'navigation',
          'width=640,height=480'
        );
      }}
    >
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItem>
  </div>
);

export const Cameras = () => {
  const baseUrl = `http://${cameraConfig.ip}:${cameraConfig.port}${cameraConfig.path}`;

  const listItems = cameraConfig.streams.map((cam) => {
    return (
      <ListItem
        button
        onClick={() => {
          window.open(`${baseUrl}${cam}`, cam, 'width=800,height=460');
        }}
      >
        <ListItemIcon>
          <VideocamIcon />
        </ListItemIcon>
        <ListItemText primary={`${cam}`} />
      </ListItem>
    );
  });

  return (
    <div>
      <ListSubheader inset style={{ textAlign: 'left' }}>
        Cameras
      </ListSubheader>
      {listItems}
    </div>
  );
};

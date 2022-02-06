import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GridOnIcon from '@material-ui/icons/GridOn';
import VideocamIcon from '@material-ui/icons/Videocam';
import MapIcon from '@material-ui/icons/Map';
import NavigationIcon from '@material-ui/icons/Navigation';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { cameraConfig } from './constants';
import { Collapse, Divider, List } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';

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

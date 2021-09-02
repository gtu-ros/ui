import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GridOnIcon from '@material-ui/icons/GridOn';
import VideocamIcon from '@material-ui/icons/Videocam';
import { cameraConfig } from './constants';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GridOnIcon
          onClick={() => {
            window.open(
              `${window.location.origin}/urdf`,
              'urdf',
              'width=640,height=480'
            );
          }}
        />
      </ListItemIcon>
      <ListItemText primary="URDF" />
    </ListItem>
  </div>
);

export const Cameras = () => {
  const baseUrl = `http://${cameraConfig.ip}:${cameraConfig.port}${cameraConfig.path}`;

  const listItems = cameraConfig.streams.map((cam) => {
    return (
      <ListItem button>
        <ListItemIcon>
          <VideocamIcon
            onClick={() => {
              window.open(`${baseUrl}${cam}`, cam, 'width=800,height=460');
            }}
          />
        </ListItemIcon>
        <ListItemText primary={`${cam}`} />
      </ListItem>
    );
  });

  return (
    <div>
      <ListSubheader inset>Cameras</ListSubheader>
      {listItems}
    </div>
  );
};

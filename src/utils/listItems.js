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
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BiotechIcon from '@mui/icons-material/Biotech';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { cameraConfig } from './constants';
import { Collapse, Divider, List } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useRosWs from '../hooks/useRosWs';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.grey[900]
}));

export const MainListItems = (props) => {
  const { url } = useRosWs();
  return (
    <div>
      <ListSubheader inset style={{ textAlign: 'left' }}>
        Dashboard
      </ListSubheader>

      <StyledLink to="/">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItem>
      </StyledLink>
      <StyledLink to="/arm">
        <ListItem button>
          <ListItemIcon>
            <PrecisionManufacturingIcon />
          </ListItemIcon>
          <ListItemText primary="Robotic Arm" />
        </ListItem>
      </StyledLink>
      <StyledLink to="/navigation">
        <ListItem button>
          <ListItemIcon>
            <NavigationIcon />
          </ListItemIcon>
          <ListItemText primary="Navigation" />
        </ListItem>
      </StyledLink>
      <StyledLink to="/science">
        <ListItem button>
          <ListItemIcon>
            <BiotechIcon />
          </ListItemIcon>
          <ListItemText primary="Science" />
        </ListItem>
      </StyledLink>

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
        component={Link}
        to={`/DRIVE_CONTROLS?ROS_URL=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="Drive Controls" />
      </ListItem>
    </div>
  );
};

// for ip cameras
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

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography
} from '@mui/material';
import { useModal } from 'mui-modal-provider';
import LargeModal from '../LargeModal';
import { ZoomOutMap, OpenInBrowser, Settings } from '@mui/icons-material';
import './style.css';
import { Link } from 'react-router-dom';
import useRosWs from '../../hooks/useRosWs';
import VisibilityToggle from '../VisibilityToggle';
import usePluginState from '../../hooks/usePluginState';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { startCase } from 'lodash';
import moment from 'moment';

export const FrameTitle = ({ children }) => {
  return (
    <Typography
      style={{ margin: 'auto 0', display: 'inline' }}
      variant="subtitle2"
      color="primary"
      align="left"
      gutterBottom
    >
      {children}
    </Typography>
  );
};

const Header = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        cursor: 'grab',
        zIndex: 10
      }}
    >
      {children}
    </div>
  );
};

const WindowButton = ({ children, ...rest }) => (
  <IconButton
    {...rest}
    className="cancel-draggable"
    size="small"
    edge="start"
    color="inherit"
  >
    {children}
  </IconButton>
);

const windowIconStyle = { transform: 'scale(0.6)' };

const Frame = ({ children, title, pluginKey, fixed = false }) => {
  const { showModal } = useModal();
  const { url } = useRosWs();
  const { status, toggleStatus, data, setData } = usePluginState(pluginKey);
  const [anchorEl, setAnchorEl] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const zoomOutButton = (
    <WindowButton onClick={() => showModal(LargeModal, { title, children })}>
      <ZoomOutMap style={windowIconStyle} />
    </WindowButton>
  );

  const newWindow = (
    <Link
      to={`/${pluginKey}?ROS_URL=${url}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WindowButton>
        <OpenInBrowser style={windowIconStyle} />
      </WindowButton>
    </Link>
  );

  const settingsButton = (
    <span>
      <WindowButton onClick={handleClick}>
        <Settings style={windowIconStyle} />
      </WindowButton>
      <Menu
        className="cancel-draggable"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <form
          onChange={handleSubmit((d) =>
            setData({ ...data, settings: { ...d } })
          )}
        >
          {data?.settings &&
            Object.entries(data?.settings).map(([k, v]) => {
              if (typeof v == 'boolean') {
                return (
                  <MenuItem>
                    <FormControlLabel
                      control={<Checkbox checked={v} {...register(k)} />}
                      label={startCase(k)}
                    />
                  </MenuItem>
                );
              }
            })}
        </form>
      </Menu>
    </span>
  );

  const formatTime = (s) =>
    s
      ? moment(new Date(s * 1e3))
          .format()
          .slice(-14, -6)
      : '';

  return (
    <div
      style={{ height: '100%', overflow: fixed ? 'hidden' : 'auto' }}
      className="wrapper"
    >
      <Box sx={fixed && { height: '100%' }} padding={0}>
        <Header>
          <Grid container justifyContent="space-between">
            <div style={{ display: 'flex' }}>
              <VisibilityToggle
                status={status}
                onToggle={() => toggleStatus()}
              />
              <FrameTitle className="draggable">{title}</FrameTitle>
            </div>
            <div style={{ display: 'flex' }}>
              <span className="time">{formatTime(data?.timestamp)}</span>
              <span className="window-buttons">
                {data?.settings && settingsButton}
                {newWindow}
                {zoomOutButton}
              </span>
            </div>
          </Grid>
        </Header>
        <Box
          sx={fixed && { height: 'calc(100% - 30px)' }} // header height: 30px
          className="cancel-draggable"
        >
          {status !== 'disabled' && children}
        </Box>
      </Box>
    </div>
  );
};

export default Frame;

import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField
} from '@mui/material';
import { History } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMissionLogIndex,
  setMissionLogOffset
} from '../../redux/ui/ui.actions';
import { selectMissionLog } from '../../redux/ui/ui.selectors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getFirstSec, getLastSec, getMaxCount } from './utils';
import { LIMIT, resetDatabase } from '../../db';

const Input = styled(MuiInput)`
  width: 42px;
`;

const MissionLogController = () => {
  const dispatch = useDispatch();
  const missionLog = useSelector(selectMissionLog);
  const [value, setValue] = useState(missionLog?.index || 0);
  const [max, setMax] = useState(missionLog?.max || LIMIT - 1);
  const [offset, setOffset] = useState(missionLog?.offset || 0);

  const [stats, setStats] = useState({});

  // const getSecs = async (key) => await db[key].orderBy('secs').last();
  // getSecs('ZED_IMAGE').then((m) => console.log(m.secs));

  const toDate = (secs) => new Date(secs * 1000);

  useEffect(() => {
    getFirstSec().then((f) => setStats((s) => ({ ...s, first: toDate(f) })));

    getLastSec().then((l) => setStats((s) => ({ ...s, last: toDate(l) })));

    getMaxCount().then((c) => setStats((s) => ({ ...s, count: c })));
  }, []);

  console.log({ stats });

  const handleSliderChange = (event, newValue) => {
    if (newValue < 0) newValue = 0;
    if (newValue > max) newValue = max;
    setValue(newValue);
    return newValue;
  };

  const handleSliderChangeCommited = (event, newValue) => {
    console.log({ event });
    console.log({ newValue });
    newValue = handleSliderChange(event, newValue);
    dispatch(setMissionLogIndex(newValue));
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value) || 0;
    setOffset(newValue);
    dispatch(setMissionLogOffset(newValue));
    dispatch(setMissionLogIndex(0));
    setValue(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper variant="outlined" square sx={{ height: '100%' }}>
      <Box sx={{ width: '95%', m: 2 }}>
        {/* <Typography id="input-slider" gutterBottom>
          Mission Log Controller
        </Typography> */}

        <Typography
          mb={1}
        >{`[ ${stats?.first?.toLocaleString()} - ${stats?.last?.toLocaleTimeString()} ] - ${
          stats?.count} entries`}</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton size="small" onClick={handleClick}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <History />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              // anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem onClick={resetDatabase}>Reset Database</MenuItem>
              <MenuItem>TODO: Export</MenuItem>
              <MenuItem>TODO: Import</MenuItem>
            </Menu>
          </Grid>
          <Grid item>
            <Typography>
              {'Offset: '}
              <Input
                value={offset}
                onChange={handleInputChange}
                inputProps={{ type: 'number', min: 0 }}
              />
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {value}/{max}
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              min={0}
              max={max}
              value={value}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommited}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => handleSliderChangeCommited(_, value - 1)}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSliderChangeCommited(_, value + 1)}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MissionLogController;

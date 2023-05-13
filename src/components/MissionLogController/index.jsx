import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { IconButton, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  missionLogNext,
  missionLogPrev,
  setMissionLogIndex,
  setMissionLogOffset
} from '../../redux/ui/ui.actions';
import { selectMissionLog } from '../../redux/ui/ui.selectors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getStats } from './utils';
import { LIMIT } from '../../db';
import HistoryOptions from './HistoryOptions';
import useLongPress from '../../hooks/useLongPress';

const Input = styled(MuiInput)`
  width: 42px;
`;

const MissionLogController = () => {
  const dispatch = useDispatch();
  const { index, offset } = useSelector(selectMissionLog);

  const max = LIMIT - 1;

  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats().then(setStats)
  }, []);

  const handleSliderChangeCommited = (event, newValue) => {
    dispatch(setMissionLogIndex(newValue));
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value) || 0;
    dispatch(setMissionLogOffset(newValue));
    dispatch(setMissionLogIndex(0));
  };

  const handleNext = () => {
    dispatch(missionLogNext());
  };

  const handlePrev = () => {
    dispatch(missionLogPrev());
  };

  const holdConfig = { delay: 500, repeat: 100 };

  const nextHold = useLongPress(handleNext, holdConfig);

  const prevHold = useLongPress(handlePrev, holdConfig);

  return (
    <Paper variant="outlined" square sx={{ height: '100%' }}>
      <Box sx={{ width: '95%', m: 2 }}>
        <Typography
          mb={1}
        >{`[ ${stats?.first?.toLocaleString()} - ${stats?.last?.toLocaleString()} ] - ${
          stats?.count
        } entries`}</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <HistoryOptions />
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
              {index}/{max}
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              marks
              min={0}
              max={max}
              value={index}
              onChangeCommitted={handleSliderChangeCommited}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <IconButton {...prevHold} onClick={handlePrev}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton {...nextHold} onClick={handleNext}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MissionLogController;

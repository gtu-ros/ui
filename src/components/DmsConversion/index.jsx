import { useState } from 'react';
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowCircleRight } from '@mui/icons-material';

const inputProps = {
  size: 'small',
  variant: 'outlined',
  InputLabelProps: { shrink: true }
};

export default () => {
  const { register, handleSubmit, setValue } = useForm();
  const [result, setResult] = useState(null);

  const dms = {
    degrees: 'degrees',
    minutes: 'minutes',
    seconds: 'seconds'
  };

  const onSubmit = ({ degrees, minutes, seconds }) => {
    const decimal =
      parseFloat(degrees) +
      parseFloat(minutes) / 60 +
      parseFloat(seconds) / 3600;

    setResult(decimal);
    navigator.clipboard.writeText(decimal);
  };

  //   const handleImport = async () => {
  //     const set = (x) => (y) => setValue(x, y);
  //     fillFromClipboard([set('latitude'), set('longitude')]);
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            '& .MuiFormControl-root': { margin: 1, width: '100%' }
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              label="Degrees"
              {...register(dms.degrees)}
              {...inputProps}
            />
            <TextField
              label="Minutes"
              {...register(dms.minutes)}
              {...inputProps}
            />
            <TextField
              label="Seconds"
              {...register(dms.seconds)}
              {...inputProps}
            />
            <IconButton sx={{ m: 1 }} type="submit" color="primary">
              <ArrowCircleRight />
            </IconButton>
          </Box>
        </Box>
      </form>
      <Divider />
      <Box sx={{ m: 1 }}>{result}</Box>
    </div>
  );
};

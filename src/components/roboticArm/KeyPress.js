import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '0px',
    minWidth: '26px'
  },
  highlight: {
    backgroundColor: '#ddd'
  }
}));

export const KeyPress = (props) => {
  const classes = useStyles();
  return props.keyName ? (
    <Button
      className={clsx(classes.content, props.highlight && classes.highlight)}
      variant="outlined"
      size="small"
    >
      {props.keyName}
    </Button>
  ) : (
    ''
  );
};

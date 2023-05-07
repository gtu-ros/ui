import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export default function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      align="left"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ highlight }) => ({
  transition: 'none',
  padding: '0px',
  minWidth: '26px',
  ...(highlight && {
    backgroundColor: '#D8BFD8'
  })
}));

export const KeyPress = ({ highlight, keyName, ...props }) => {
  return (
    <StyledButton
      {...props}
      highlight={highlight}
      variant="outlined"
      size="small"
    >
      {keyName}
    </StyledButton>
  );
};

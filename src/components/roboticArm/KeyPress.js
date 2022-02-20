import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ highlight }) => ({
  padding: '0px',
  minWidth: '26px',
  ...(highlight && {
    backgroundColor: '#ddd'
  })
}));

export const KeyPress = ({ highlight, keyName }) => {
  return keyName ? (
    <StyledButton highlight={highlight} variant="outlined" size="small">
      {keyName}
    </StyledButton>
  ) : (
    ''
  );
};

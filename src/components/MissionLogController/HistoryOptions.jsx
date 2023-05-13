import { useRef, useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { History } from '@mui/icons-material';
import { exportDatabase, importDatabase, resetDatabase } from '../../db';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fileInput = useRef();

  const selectFile = () => {
    fileInput.current.click();
  };

  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    importDatabase(file);
  };

  return (
    <>
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
        <MenuItem onClick={exportDatabase}>Export</MenuItem>
        <MenuItem onClick={selectFile}>Import</MenuItem>
      </Menu>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={fileUploadHandler}
      />
    </>
  );
};

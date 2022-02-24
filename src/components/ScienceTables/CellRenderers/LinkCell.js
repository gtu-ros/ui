import { IconButton } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const LinkCell = ({ src }) =>
  src ? (
    <a target="_blank" href={src}>
      <IconButton>
        <PhotoLibraryIcon />
      </IconButton>
    </a>
  ) : (
    <div>-</div>
  );

export default LinkCell;

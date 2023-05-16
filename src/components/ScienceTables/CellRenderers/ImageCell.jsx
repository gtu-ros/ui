import { IconButton } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import ImageIcon from '@mui/icons-material/Image';
import { LargeModal } from '../../Modal';

const ImageCell = ({ src, modalTitle = '' }) => {
  const { showModal } = useModal();

  return (
    <IconButton
      onClick={() => {
        showModal(LargeModal, {
          title: modalTitle,
          children: (
            <img
              src={src}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}
            />
          )
        });
      }}
    >
      <ImageIcon />
    </IconButton>
  );
};

export default ImageCell;

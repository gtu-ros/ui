import { DialogContent } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const LargeModal = ({ title, children, ...props }) => (
  <Dialog {...props} maxWidth={'xl'} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <div style={{ height: '80vh' }}>{children}</div>
    </DialogContent>
  </Dialog>
);

export default LargeModal;

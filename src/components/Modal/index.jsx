import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export const LargeModal = ({ title, children, ...props }) => (
  <Dialog {...props} maxWidth={'xl'} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <div style={{ height: '80vh' }}>{children}</div>
    </DialogContent>
  </Dialog>
);

export const Modal = ({ title, children, ...props }) => (
  <Dialog {...props}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

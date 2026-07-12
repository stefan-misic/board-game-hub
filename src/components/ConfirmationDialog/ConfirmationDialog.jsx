import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

import useIcons from '../../hooks/useIcons';

const ConfirmationDialog = ({
  confirmationButton,
  dialogContent,
  dialogTitle,
  isOpen,
  setIsOpen
}) => {
  const { buttons: buttonIcons } = useIcons();
  const { t: tb } = useTranslation('buttons');

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onClose={handleOnClose} open={isOpen}>
      <DialogTitle>
        {dialogTitle}
        <IconButton
          color='inherit'
          onClick={handleOnClose}
          size='small'
          sx={{ float: 'right' }}
        >
          {buttonIcons.close}
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        {confirmationButton}
        <Button
          onClick={handleOnClose}
          startIcon={buttonIcons.cancel}
          sx={{ padding: '6px 16px' }}
          variant='outlined'
        >
          {tb('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

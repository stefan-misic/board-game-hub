import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';

import useIcons from '../../hooks/useIcons';
import { selectHasMessage, selectMessage, selectMessageType, setHasMessage } from '../../store/global.slice';
import { StyledSnackbar } from './MessagePopup.styled';

const MessagePopup = () => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons } = useIcons();
  const isVisible = useSelector(selectHasMessage);
  const message = useSelector(selectMessage);
  const messageType = useSelector(selectMessageType);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setHasMessage({ hasMessage: false, message, messageType }));
  };

  return (
    <StyledSnackbar
      $messageType={messageType}
      action={
        <IconButton
          color='inherit'
          onClick={handleClose}
          size='small'
        >
          {buttonIcons.close}
        </IconButton>
      }
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={5000}
      message={message}
      onClose={handleClose}
      open={isVisible}
    />
  );
};

export default MessagePopup;

import IconButton from '@mui/material/IconButton';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useIcons from '../../hooks/useIcons';
import { StoreDispatch, StoreState } from '../../store';
import { selectHasMessage, selectMessage, selectMessageType, setHasMessage } from '../../store/global.slice';
import { StyledSnackbar } from './MessagePopup.styled';

const MessagePopup = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons } = useIcons();
  const isVisible = useSelector<StoreState, boolean>(selectHasMessage);
  const message = useSelector<StoreState, string>(selectMessage);
  const messageType = useSelector<StoreState, string>(selectMessageType);

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
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

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { StyledAvatar } from '../../global_styled_components';
import { uploadFileService } from '../../services/storage.services';
import { setHasMessage, setIsLoading } from '../../store/global.slice';

const ImageUpload = ({ alternativeText, onImageUpload }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const { t: tb } = useTranslation('buttons');
  const { t: tm } = useTranslation('messages');

  const { mutate: uploadImageMutation } = useMutation({
    mutationFn: (uploadedFile) => {
      dispatch(setIsLoading(true));
      return uploadFileService(uploadedFile);
    },
    onSuccess: (response) => {
      dispatch(setIsLoading(false));
      onImageUpload(response?.$id);
      dispatch(setHasMessage({ hasMessage: true, message: tm('imageUploaded'), messageType: 'success' }));
    },
    onError: (error) => {
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
    }
  });

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      uploadImageMutation(file);
    }
  };

  return (
    <Stack alignItems='center' direction='column'>
      <StyledAvatar alt={alternativeText} src={image} />
      <Button component='label' size='small' startIcon={<CloudUploadIcon />} variant='contained'>
        {tb('upload')}
        <input
          accept='image/*'
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          type='file'
        />
      </Button>
    </Stack>
  );
};

export default ImageUpload;

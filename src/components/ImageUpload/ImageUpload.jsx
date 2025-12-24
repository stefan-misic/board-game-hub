import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { uploadFileService } from '../../services/storage.services';
import { StyledAvatar } from './ImageUpload.styled';

const ImageUpload = ({ alternativeText, onImageUpload }) => {
  const [image, setImage] = useState('');
  const { t: tb } = useTranslation('buttons');

  const { mutate: uploadImageMutation } = useMutation({
    mutationFn: ({ id, file }) => {
      return uploadFileService(id, file);
    },
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error) => {
      console.log('error', error);
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
      const id = uuid();
      onImageUpload(id);
      uploadImageMutation({ id, file });
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

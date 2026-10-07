import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import type { Models } from 'appwrite';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { StyledAvatar } from '../../global_styled_components';
import { uploadFileService } from '../../services/storage.services';
import { setHasMessage, setIsLoading } from '../../store/global.slice';

interface ImageUploadProps {
  alternativeText: string;
  initialImage: string;
  onImageUpload: (imageId: string) => void;
}
const ImageUpload = ({ alternativeText, initialImage, onImageUpload }: ImageUploadProps) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | ArrayBuffer | null>(initialImage || '');
  const [previousInitialImage, setPreviousInitialImage] = useState<string>(initialImage);
  const { t: tb } = useTranslation('buttons');
  const { t: tm } = useTranslation('messages');

  if (initialImage !== previousInitialImage) {
    setImage(initialImage || '');
    setPreviousInitialImage(initialImage);
  }

  const { mutate: uploadImageMutation } = useMutation<Models.File, unknown, File>({
    mutationFn: (uploadedFile: File) => {
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
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setHasMessage({ hasMessage: true, message: errorMessage, messageType: 'error' }));
    }
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
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
      <StyledAvatar alt={alternativeText} src={typeof image === 'string' ? image : ''} sx={{ marginBottom: '1rem' }} />
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

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { StyledAvatar } from './ImageUpload.styled';

const ImageUpload = ({ alternativeText, onImageUpload, value }) => {
  const { t: tb } = useTranslation('buttons');

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack alignItems='center' direction='column'>
      <StyledAvatar alt={alternativeText} src={value} />
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

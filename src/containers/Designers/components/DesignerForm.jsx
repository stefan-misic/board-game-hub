import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import { defaultValues, getSchema } from './DesignerForm.schema';

const DesignerForm = () => {
  const { t: tb } = useTranslation('buttons');
  const { t: td } = useTranslation('designers');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const handleDesignerFormSubmit = (submittedData) => {
    console.log('submittedData', submittedData);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 2 }}>
        <Controller
          control={control}
          name='image'
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              alternativeText={td('avatar')}
              onImageUpload={onChange}
              value={value}
            />
          )}
        />
      </Grid>
      <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
        <Grid size={12}>
          <Controller
            control={control}
            name='display_name'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.display_name}
                helperText={errors?.display_name?.message}
                label={td('displayName')}
                onChange={onChange}
                required={true}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.name}
                helperText={errors?.name?.message}
                label={td('name')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name='is_essential'
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                label={td('isEssential')}
                control={
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                  />
                }
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Button
            onClick={handleSubmit(handleDesignerFormSubmit)}
            sx={{ mr: 1 }}
            size='large'
            variant='contained'
          >
            {tb('create')}
          </Button>
          <Button
            size='large'
            variant='outlined'
          >
            {tb('cancel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DesignerForm;

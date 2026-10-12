import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import config from '../../../config';
import { getCountries } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { defaultValues, getSchema, PublisherFormValues } from './PublisherForm.schema';

interface PublisherFormProps {
  formData?: PublisherFormValues | null | undefined
}
const PublisherForm = ({ formData }: PublisherFormProps) => {
  const countries = getCountries();
  const { buttons: buttonIcons, publishers: publisherIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState<boolean>(false);
  const { t: tb } = useTranslation('buttons');
  const { t: tdi } = useTranslation('dialogs');
  const { t: tdp } = useTranslation('publishers');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const {
    control,
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
    setValue
  } = useForm<PublisherFormValues>({ defaultValues, resolver: yupResolver(schema) });

  useEffect(() => {
    if (formData) {
      setValue('country', formData?.country || null);
      setValue('image_id', formData?.image_id || '');
      setValue('name', formData?.name || '');
      setValue('type', formData?.type || '');
    }
  }, [countries, formData, setValue]);

  const handlePublisherFormSubmit: SubmitHandler<PublisherFormValues> = (submittedData: PublisherFormValues) => {
    if (id) {
      console.log(submittedData);
    } else {
      console.log(submittedData);
    }
  };

  const initialStorageImage = formData?.image_id
    ? `${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${formData?.image_id}/view?project=${config.appwriteConfig.projectId}`
    : '';

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 2 }}>
        <Controller
          control={control}
          name='image_id'
          render={({ field: { onChange } }) => (
            <ImageUpload
              alternativeText={tdp('avatar')}
              initialImage={initialStorageImage}
              onImageUpload={onChange}
            />
          )}
        />
      </Grid>

      <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
        <Grid size={12}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.name}
                helperText={errors?.name?.message}
                label={tdp('name')}
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
            name='country'
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id='publisher-country-label'>{tdp('country')}</InputLabel>
                <Select
                  id='publisher-country'
                  label={tdp('country')}
                  labelId='publisher-country-label'
                  onChange={onChange}
                  renderValue={(selectedId) => {
                    const selectedCountry = countries?.find((country) => country.id === selectedId);
                    if (!selectedCountry) return '';
                    return (
                      <Stack alignItems='center' direction='row' gap={1}>
                        <img alt={selectedCountry.name} src={selectedCountry.flagUrl} style={{ height: 'auto', width: 20 }} />
                        <span>{selectedCountry.name}</span>
                      </Stack>
                    );
                  }}
                  value={value ?? ''}
                >
                  {countries?.map((country) => (
                    <MenuItem key={country?.id} value={country?.id ?? ''}>
                      <Stack alignItems='center' direction='row' gap={1}>
                        <img alt={country?.name} src={country?.flagUrl} style={{ height: 'auto', width: 20 }} />
                        {country?.name}
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name='type'
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id='publisher-type-label'>{tdp('type')}</InputLabel>
                <Select
                  id='publisher-type'
                  label={tdp('type')}
                  labelId='publisher-type-label'
                  onChange={onChange}
                  renderValue={() => (
                    <Stack direction='row' gap={1}>
                      {publisherIcons[value]}
                      {tdp(value)}
                    </Stack>
                  )}
                  value={value}
                >
                  <MenuItem value='essential'>
                    <ListItemIcon>{publisherIcons.essential}</ListItemIcon>
                    {tdp('essential')}
                  </MenuItem>
                  <MenuItem value='other'>
                    <ListItemIcon>{publisherIcons.other}</ListItemIcon>
                    {tdp('other')}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid container>
          <Button
            disabled={!isDirty}
            onClick={handleSubmit(handlePublisherFormSubmit)}
            size='large'
            startIcon={id ? buttonIcons.updateConfirm : buttonIcons.createConfirm}
            variant='contained'
          >
            {id ? tb('updateConfirm') : tb('createConfirm')}
          </Button>
          {id && (
            <Button
              color='error'
              onClick={() => setIsDeletionDialogOpen(true)}
              size='large'
              startIcon={buttonIcons.delete}
              variant='outlined'
            >
              {tb('delete')}
            </Button>
          )}
          <Button
            onClick={() => id ? navigate(`/publishers/${id}`) : navigate('/publishers')}
            size='large'
            startIcon={buttonIcons.cancel}
            variant='outlined'
          >
            {tb('cancel')}
          </Button>
        </Grid>
      </Grid>

      {id && (
        <ConfirmationDialog
          confirmationButton={
            <Button
              color='error'
              onClick={() => console.log('delete')} 
              startIcon={buttonIcons.deleteConfirm}
              variant='contained'
            >
              {tb('deleteConfirm')}
            </Button>
          }
          dialogContent={tdi('deletionContent', { entryName: getValues('name') })}
          dialogTitle={tdi('deletionTitle')}
          isOpen={isDeletionDialogOpen}
          setIsOpen={setIsDeletionDialogOpen}
        />
      )}
    </Grid>
  );
};

export default PublisherForm;

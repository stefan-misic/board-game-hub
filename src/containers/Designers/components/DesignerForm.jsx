import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import useIcons from '../../../hooks/useIcons';
import { createDesignerService, updateDesignerService } from '../../../services/designers.services';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { defaultValues, getSchema } from './DesignerForm.schema';

const DesignerForm = ({ formData }) => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t: tb } = useTranslation('buttons');
  const { t: td } = useTranslation('designers');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const { control, formState: { errors }, handleSubmit, setValue } = useForm({ defaultValues, resolver: yupResolver(schema) });

  useEffect(() => {
    if (formData) {
      setValue('display_name', formData?.display_name || '');
      setValue('image_id', formData?.image_id || '');
      setValue('name', formData?.name || '');
      setValue('type', formData?.type || '');
    }
  }, [formData]);

  const { mutate: createDesignerMutation } = useMutation({
    mutationFn: (designerData) => {
      dispatch(setIsLoading(true));
      return createDesignerService(designerData);
    },
    onSuccess: (response) => {
      navigate(`/designers/${response?.$id}`);
      dispatch(setHasMessage({ hasMessage: true, message: td('designerCreated'), messageType: 'success' }));
    },
    onError: (error) => {
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
    }
  });

  const { mutate: updateDesignerMutation } = useMutation({
    mutationFn: (designerData) => {
      dispatch(setIsLoading(true));
      return updateDesignerService(id, designerData);
    },
    onSuccess: (response) => {
      navigate(`/designers/${response?.$id}`);
      dispatch(setHasMessage({ hasMessage: true, message: td('designerUpdated'), messageType: 'success' }));
    },
    onError: (error) => {
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
    }
  });

  const handleDesignerFormSubmit = (submittedData) => {
    if (id) {
      updateDesignerMutation(submittedData);
    } else {
      createDesignerMutation(submittedData);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 2 }}>
        <Controller
          control={control}
          name='image_id'
          render={({ field: { onChange } }) => (
            <ImageUpload
              alternativeText={td('avatar')}
              onImageUpload={onChange}
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
            name='type'
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id='designer-type-label'>{td('type')}</InputLabel>
                <Select
                  id='designer-type'
                  label={td('type')}
                  labelId='designer-type-label'
                  onChange={onChange}
                  renderValue={() => (
                    <Stack direction='row' gap={1}>
                      {designerIcons[value]}
                      {td(value)}
                    </Stack>
                  )}
                  value={value}
                >
                  <MenuItem value='top'>
                    <ListItemIcon>{designerIcons.top}</ListItemIcon>
                    {td('top')}
                  </MenuItem>
                  <MenuItem value='essential'>
                    <ListItemIcon>{designerIcons.essential}</ListItemIcon>
                    {td('essential')}
                  </MenuItem>
                  <MenuItem value='other'>
                    <ListItemIcon>{designerIcons.other}</ListItemIcon>
                    {td('other')}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid container>
          <Button
            onClick={handleSubmit(handleDesignerFormSubmit)}
            size='large'
            startIcon={id ? buttonIcons.updateConfirm : buttonIcons.create}
            variant='contained'
          >
            {id ? tb('updateConfirm') : tb('create')}
          </Button>
          <Button
            size='large'
            startIcon={buttonIcons.cancel}
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

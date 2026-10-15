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
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { getStorageImageUrl } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { searchDesignersService } from '../../../services/designers.services';
import { defaultValues, GameFormValues, getSchema } from './GameForm.schema';

interface GameFormProps {
  formData?: GameFormValues | null | undefined
}
const GameForm = ({ formData }: GameFormProps) => {
  const { buttons: buttonIcons, games: gameIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [designersSearchTerm, setDesignersSearchTerm] = useState<string>('');
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState<boolean>(false);
  const { t: tb } = useTranslation('buttons');
  const { t: tdi } = useTranslation('dialogs');
  const { t: tg } = useTranslation('games');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const {
    control,
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
    setValue
  } = useForm<GameFormValues>({ defaultValues, resolver: yupResolver(schema) });

  useEffect(() => {
    if (formData) {
      setValue('image_id', formData?.image_id || '');
      setValue('name', formData?.name || '');
      setValue('type', formData?.type || '');
    }
  }, [formData, setValue]);

  const { data: designersSearch, isLoading: designersSearchIsLoading } = useQuery({
    queryKey: ['designers-search'],
    queryFn: () => searchDesignersService(designersSearchTerm ?? ''),
    enabled: !!designersSearchTerm
  });

  const handleGameFormSubmit: SubmitHandler<GameFormValues> = (submittedData: GameFormValues) => {
    if (id) {
      console.log(submittedData);
    } else {
      console.log(submittedData);
    }
  };

  const initialStorageImage = formData?.image_id ? getStorageImageUrl(formData?.image_id) : '';

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 2 }}>
        <Controller
          control={control}
          name='image_id'
          render={({ field: { onChange } }) => (
            <ImageUpload
              alternativeText={tg('avatar')}
              initialImage={initialStorageImage}
              onImageUpload={onChange}
            />
          )}
        />
      </Grid>

      <Grid container size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 10 }} spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.name}
                helperText={errors?.name?.message}
                label={tg('name')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='system_id'
            render={({ field: { onChange } }) => (
              <SearchInput
                error={!!errors?.system_id}
                helperText={errors?.system_id?.message}
                isLoading={false}
                label={tg('system')}
                onSetSearchTerm={() => console.log('')}
                options={[]}
                setValue={onChange}
                value={null}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='designer'
            render={({ field: { onChange, value } }) => (
              <SearchInput
                error={!!errors?.designer}
                helperText={errors?.designer?.message}
                isLoading={designersSearchIsLoading}
                label={tg('designer')}
                onSetSearchTerm={setDesignersSearchTerm}
                options={designersSearch ?? []}
                setValue={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='publisher'
            render={({ field: { onChange } }) => (
              <SearchInput
                error={!!errors?.publisher}
                helperText={errors?.publisher?.message}
                isLoading={false}
                label={tg('publisher')}
                onSetSearchTerm={() => console.log('')}
                options={[]}
                setValue={onChange}
                value={null}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Controller
            control={control}
            name='year'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.year}
                helperText={errors?.year?.message}
                label={tg('year')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Controller
            control={control}
            name='player_count'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.player_count}
                helperText={errors?.player_count?.message}
                label={tg('player_count')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='type'
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id='game-type-label'>{tg('type')}</InputLabel>
                <Select
                  id='game-type'
                  label={tg('type')}
                  labelId='game-type-label'
                  onChange={onChange}
                  renderValue={() => (
                    <Stack direction='row' gap={1}>
                      {gameIcons[value]}
                      {tg(value)}
                    </Stack>
                  )}
                  value={value}
                >
                  <MenuItem value='system'>
                    <ListItemIcon>{gameIcons.system}</ListItemIcon>
                    {tg('system')}
                  </MenuItem>
                  <MenuItem value='edition'>
                    <ListItemIcon>{gameIcons.edition}</ListItemIcon>
                    {tg('edition')}
                  </MenuItem>
                  <MenuItem value='expansion'>
                    <ListItemIcon>{gameIcons.expansion}</ListItemIcon>
                    {tg('expansion')}
                  </MenuItem>
                  <MenuItem value='sequel'>
                    <ListItemIcon>{gameIcons.sequel}</ListItemIcon>
                    {tg('sequel')}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='category'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.category}
                helperText={errors?.category?.message}
                label={tg('category')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Controller
            control={control}
            name='is_owned'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.is_owned}
                helperText={errors?.is_owned?.message}
                label={tg('is_owned')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Controller
            control={control}
            name='rating'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.rating}
                helperText={errors?.rating?.message}
                label={tg('rating')}
                onChange={onChange}
                value={value ?? ''}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Controller
            control={control}
            name='last_played'
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors?.last_played}
                helperText={errors?.last_played?.message}
                label={tg('last_played')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>

        <Grid container size={12}>
          <Button
            disabled={!isDirty}
            onClick={handleSubmit(handleGameFormSubmit)}
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
            onClick={() => id ? navigate(`/games/${id}`) : navigate('/games')}
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

export default GameForm;

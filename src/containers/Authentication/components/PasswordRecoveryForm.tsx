import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { StoreDispatch } from '../../../store';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { recoverUserPassword } from '../../../store/user.slice';
import { defaultValues, getSchema, PasswordRecoveryFormValues } from './PasswordRecoveryForm.schema';

const PasswordRecoveryForm = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const { t: ta } = useTranslation('authentication');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<PasswordRecoveryFormValues>({ defaultValues, resolver: yupResolver(schema) });

  const handlepasswordRecoveryFormSubmit: SubmitHandler<PasswordRecoveryFormValues> = async (submittedData) => {
    dispatch(setIsLoading(true));
    try {
      await dispatch(recoverUserPassword({ email: submittedData.email })).unwrap();
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: ta('successfulPasswordRecovery'), messageType: 'success' }));
    } catch (error) {
      dispatch(setIsLoading(false));
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setHasMessage({ hasMessage: true, message: errorMessage, messageType: 'error' }));
    }
  };

  return (
    <>
      <Typography>{ta('passwordRecoveryDescription')}</Typography>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors?.email}
            helperText={errors?.email?.message}
            label={ta('email')}
            onChange={onChange}
            required={true}
            value={value}
          />
        )}
      />

      <Button
        onClick={handleSubmit(handlepasswordRecoveryFormSubmit)}
        size='large'
        variant='contained'
      >
        {ta('recoverPassword')}
      </Button>
      <Button
        onClick={() => navigate('/login')}
        size='large'
        variant='text'
      >
        {ta('backToLogin')}
      </Button>
    </>
  );
};

export default PasswordRecoveryForm;

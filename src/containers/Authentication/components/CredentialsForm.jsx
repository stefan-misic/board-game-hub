import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { createUserService } from '../../../services/account.services';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { defaultValues, getSchema } from './CredentialsForm.schema';

const CredentialsForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t: ta } = useTranslation('authentication');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const { mutate: createUserMutation } = useMutation({
    mutationFn: (userData) => {
      dispatch(setIsLoading(true));
      return createUserService(userData.email, userData.password);
    },
    onSuccess: (response) => {
      navigate('/designers');
      dispatch(setHasMessage({ hasMessage: true, message: ta('successfulSignUp'), messageType: 'success' }));
    },
    onError: (error) => {
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
    }
  });

  const handleCredentialsFormSubmit = (submittedData) => {
    if (location.pathname.includes('/login')) {
      console.log('login');
    } else {
      createUserMutation(submittedData);
    }
  };

  return (
    <>
      {location.pathname.includes('/signup') && (
        <Typography>{ta('signupDescription')}</Typography>
      )}

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
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors?.password}
            helperText={errors?.password?.message}
            label={ta('password')}
            onChange={onChange}
            required={true}
            value={value}
          />
        )}
      />

      <Button
        onClick={handleSubmit(handleCredentialsFormSubmit)}
        size='large'
        variant='contained'
      >
        {location.pathname.includes('/login') ? ta('login') : ta('signup')}
      </Button>
      {location.pathname.includes('/login') ? (
        <>
          <Button
            onClick={() => console.log('resetPassword')}
            size='large'
            variant='text'
          >
            {ta('resetPassword')}
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            size='large'
            variant='text'
          >
            {ta('createUser')}
          </Button>
        </>
      ) : (
        <Button
          onClick={() => navigate('/login')}
          size='large'
          variant='text'
        >
          {ta('backToLogin')}
        </Button>
      )}
    </>
  );
};

export default CredentialsForm;

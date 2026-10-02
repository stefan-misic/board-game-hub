import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { loginUser, signupUser } from '../../../store/user.slice';
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

  const handleCredentialsFormSubmit = async (submittedData) => {
    dispatch(setIsLoading(true));
    if (location.pathname.includes('/login')) {
      try {
            await dispatch(loginUser({ email: submittedData.email, password: submittedData.password })).unwrap();
            dispatch(setHasMessage({ hasMessage: true, message: ta('successfulLoggIn'), messageType: 'success' }));
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
        }
    } else {
        try {
            await dispatch(signupUser({ email: submittedData.email, password: submittedData.password })).unwrap();
            navigate('/login');
            dispatch(setIsLoading(false));
            dispatch(setHasMessage({ hasMessage: true, message: ta('successfulSignUp'), messageType: 'success' }));
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
        }
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

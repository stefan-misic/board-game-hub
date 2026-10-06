import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';

import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { changeUserPassword } from '../../../store/user.slice';
import { defaultValues, getSchema } from './NewPasswordForm.schema';

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t: ta } = useTranslation('authentication');
  const { t: tv } = useTranslation('validation');

  const schema = getSchema(tv);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const handleNewPasswordFormSubmit = async (submittedData) => {
    dispatch(setIsLoading(true));
    try {
      await dispatch(changeUserPassword({ id: searchParams.get('userId'), password: submittedData.password, secretKey: searchParams.get('secret') })).unwrap();
      navigate('/login');
      dispatch(setHasMessage({ hasMessage: true, message: ta('successfulNewPassword'), messageType: 'success' }));
    } catch (error) {
      dispatch(setHasMessage({ hasMessage: true, message: error, messageType: 'error' }));
    }
    dispatch(setIsLoading(false));
  };

  return (
    <>
      <Typography>{ta('newPasswordDescription')}</Typography>

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
        onClick={handleSubmit(handleNewPasswordFormSubmit)}
        size='large'
        variant='contained'
      >
        {ta('changePassword')}
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

export default NewPasswordForm;

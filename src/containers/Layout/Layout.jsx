import { useForm } from 'react-hook-form';
import { StyledLayout } from './Layout.styled';

const Layout = ({ children }) => {
  const { handleSubmit, register } = useForm();

  const handleAppFormSubmit = (appData) => {
    console.log('appData', appData);
  };

  return (
    <StyledLayout>
      {children}

      <form onSubmit={handleSubmit(handleAppFormSubmit)}>
        <input {...register('appInput')} />
        <input type="submit" />
      </form>
    </StyledLayout>
  );
};

export default Layout;
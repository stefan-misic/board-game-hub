import Logo from '../../../assets/Logo.svg';
import { PageContainer } from '../../../global_styled_components';
import NewPasswordForm from '../components/NewPasswordForm';
import { StyledAuthentication } from '../Authentication.styled';

const NewPasswordPage = () => {
  return (
    <PageContainer className='authentication-page' elevation={4}>
      <StyledAuthentication>
        <img src={Logo} />
        <NewPasswordForm />
      </StyledAuthentication>
    </PageContainer>
  );
};

export default NewPasswordPage;

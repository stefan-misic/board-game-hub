import Logo from '../../../assets/Logo.svg';
import { PageContainer } from '../../../global_styled_components';
import CredentialsForm from '../components/CredentialsForm';
import { StyledAuthentication } from '../Authentication.styled';

const LoginPage = () => {

  return (
    <PageContainer className='authentication-page' elevation={4}>
      <StyledAuthentication>
        <img src={Logo} />
        <CredentialsForm />
      </StyledAuthentication>
    </PageContainer>
  );
};

export default LoginPage;

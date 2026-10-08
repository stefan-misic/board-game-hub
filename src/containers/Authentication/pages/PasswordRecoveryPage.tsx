import Logo from '../../../assets/Logo.svg';
import { PageContainer } from '../../../global_styled_components';
import PasswordRecoveryForm from '../components/PasswordRecoveryForm';
import { StyledAuthentication } from '../Authentication.styled';

const PasswordRecoveryPage = () => {
  return (
    <PageContainer className='authentication-page' elevation={4}>
      <StyledAuthentication>
        <img src={Logo} />
        <PasswordRecoveryForm />
      </StyledAuthentication>
    </PageContainer>
  );
};

export default PasswordRecoveryPage;

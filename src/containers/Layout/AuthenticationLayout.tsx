import { StyledLayout } from './Layout.styled';

const AuthenticationLayout = ({ children }) => {
  return (
    <StyledLayout $type='authentication'>
      {children}
    </StyledLayout>
  );
};

export default AuthenticationLayout;
import { ReactNode } from 'react';

import { StyledLayout } from './Layout.styled';

interface AuthenticationLayoutProps {
  children: ReactNode
}
const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <StyledLayout $type='authentication'>
      {children}
    </StyledLayout>
  );
};

export default AuthenticationLayout;
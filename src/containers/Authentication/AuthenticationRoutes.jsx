import LoginPage from './pages/LoginPage';
import NewPasswordPage from './pages/NewPasswordPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import SignupPage from './pages/SignupPage';

const AuthenticationRoutes = [
  { path: '/signup', element: <SignupPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/password-recovery', element: <PasswordRecoveryPage /> },
  { path: '/password-recovery/new-password', element: <NewPasswordPage /> }
];

export default AuthenticationRoutes;

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const AuthenticationRoutes = [
  { path: '/signup', element: <SignupPage /> },
  { path: '/login', element: <LoginPage /> }
];

export default AuthenticationRoutes;

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router';

import AuthenticationRoutes from './containers/Authentication/AuthenticationRoutes';
import DesignersRoutes from './containers/Designers/DesignersRoutes';
import AuthenticationLayout from './containers/Layout/AuthenticationLayout';
import Layout from './containers/Layout/Layout';

const Router = ({ isUserAuthenticated }) => {
  const routes = isUserAuthenticated ? [
    ...DesignersRoutes
  ] : [
    ...AuthenticationRoutes
  ];

  return (
    <BrowserRouter>
      {isUserAuthenticated ? (
        <Layout>
          <Routes>
            {routes?.map((route, i) => (
              <Route
                element={route.element}
                key={i}
                path={route.path}
              />
            ))}

            <Route element={<Navigate to='/designers' />} path='*' />
          </Routes>
        </Layout>
      ) : (
        <AuthenticationLayout>
          <Routes>
            {routes?.map((route, i) => (
              <Route
                element={route.element}
                key={i}
                path={route.path}
              />
            ))}

            <Route element={<Navigate to='/login' />} path='*' />
          </Routes>
        </AuthenticationLayout>
      )}
    </BrowserRouter>
  );
};

export default Router;
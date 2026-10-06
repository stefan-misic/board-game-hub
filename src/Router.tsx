import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router';

import RouteGuard from './components/RouteGuard/RouteGuard';
import AuthenticationRoutes from './containers/Authentication/AuthenticationRoutes';
import UnauthorizedPage from './containers/Authorization/pages/UnauthorizedPage';
import DesignersRoutes from './containers/Designers/DesignersRoutes';
import AuthenticationLayout from './containers/Layout/AuthenticationLayout';
import Layout from './containers/Layout/Layout';
import { RouteConfig } from './types/router.types';

interface RouterProps {
  isUserAuthenticated: boolean;
}
const Router = ({ isUserAuthenticated }: RouterProps) => {
  const routes: RouteConfig[] = isUserAuthenticated ? [
    ...DesignersRoutes
  ] : [
    ...AuthenticationRoutes
  ];

  return (
    <BrowserRouter>
      {isUserAuthenticated ? (
        <Layout>
          <Routes>
            {routes?.map((route, i) => {
              if (route.permissions && route.permissions.length > 0) {
                return (
                  <Route 
                    element={<RouteGuard requiredPermissions={route.permissions} />}
                    key={i} 
                  >
                    <Route element={route.element} path={route.path} />
                  </Route>
                );
              }

              return <Route element={route.element} key={i} path={route.path} />;
            })}

            <Route element={<UnauthorizedPage />} path='/unauthorized' />
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
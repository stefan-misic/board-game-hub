import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import DesignersRoutes from './containers/Designers/DesignersRoutes';
import Layout from './containers/Layout/Layout';

const Router = () => {
  const routes = [
    ...DesignersRoutes
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            element={<div></div>}
            exact
            path={'/'}
          />

          {routes?.map((route, i) => (
            <Route
              {...route?.element && { element: route.element }}
              exact
              key={i}
              {...route?.path && { path: route.path }}
            />
          ))}

          <Route element={<div></div>} path='*' />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
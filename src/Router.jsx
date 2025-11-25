import { useTranslation } from 'react-i18next';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Layout from './containers/Layout/Layout';

const Router = () => {
  const { t } = useTranslation('app');

  const routes = [
    { path: '/', element: location.hash === '' && <Navigate to='bgh' /> },
    { path: '/bgh', element: <p>{t('app')}</p> }
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes?.map((route, i) => (
            <Route
              {...route?.element && { element: route.element }}
              exact
              key={i}
              {...route?.path && { path: route.path }}
            />
          ))}

          <Route element={<p>{t('app')}</p>} path='*' />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
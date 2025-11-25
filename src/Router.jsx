import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Layout from './containers/Layout/Layout';

const Router = () => {
  const routes = [
    { path: '/', element: location.hash === '' && <Navigate to='bgh' /> },
    { path: '/bgh', element: <div></div> }
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

          <Route element={<div></div>} path='*' />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
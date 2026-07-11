import CreateDesignerPage from './pages/CreateDesignerPage';
import DesignerDetailsPage from './pages/DesignerDetailsPage';
import UpdateDesignerPage from './pages/UpdateDesignerPage';

const DesignersRoutes = [
  { path: '/designers/create', element: <CreateDesignerPage /> },
  { path: '/designers/:id', element: <DesignerDetailsPage /> },
  { path: '/designers/:id/update', element: <UpdateDesignerPage /> }
];

export default DesignersRoutes;
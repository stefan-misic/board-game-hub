import CreateDesignerPage from './pages/CreateDesignerPage';
import DesignerDetailsPage from './pages/DesignerDetailsPage';
import DesignersListPage from './pages/DesignersListPage';
import UpdateDesignerPage from './pages/UpdateDesignerPage';

const DesignersRoutes = [
  { path: '/designers', element: <DesignersListPage /> },
  { path: '/designers/create', element: <CreateDesignerPage /> },
  { path: '/designers/:id', element: <DesignerDetailsPage /> },
  { path: '/designers/:id/update', element: <UpdateDesignerPage /> }
];

export default DesignersRoutes;
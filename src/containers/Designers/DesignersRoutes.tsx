import { RouteConfig } from '../../types/router.types';
import CreateDesignerPage from './pages/CreateDesignerPage';
import DesignerDetailsPage from './pages/DesignerDetailsPage';
import DesignersListPage from './pages/DesignersListPage';
import UpdateDesignerPage from './pages/UpdateDesignerPage';

const DesignersRoutes: RouteConfig[] = [
  { path: '/designers', element: <DesignersListPage /> },
  { path: '/designers/create', permissions: ['admin'], element: <CreateDesignerPage />, },
  { path: '/designers/:id', element: <DesignerDetailsPage /> },
  { path: '/designers/:id/update', permissions: ['admin'], element: <UpdateDesignerPage /> }
];

export default DesignersRoutes;
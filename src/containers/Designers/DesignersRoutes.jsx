import CreateDesignerPage from './pages/CreateDesignerPage';
import DesignerDetailsPage from './pages/DesignerDetailsPage';

const DesignersRoutes = [
  { path: '/designers/create', element: <CreateDesignerPage /> },
  { path: '/designers/:id', element: <DesignerDetailsPage /> }
];

export default DesignersRoutes;
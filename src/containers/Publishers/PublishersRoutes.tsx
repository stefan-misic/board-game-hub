import { RouteConfig } from '../../types/router.types';
import CreatePublisherPage from './pages/CreatePublisherPage';
import PublishersListPage from './pages/PublishersListPage';

const PublishersRoutes: RouteConfig[] = [
  { path: '/publishers', element: <PublishersListPage /> },
  { path: '/publishers/create', permissions: ['admin'], element: <CreatePublisherPage />, },
];

export default PublishersRoutes;
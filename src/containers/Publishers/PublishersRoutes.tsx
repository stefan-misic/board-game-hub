import { RouteConfig } from '../../types/router.types';
import CreatePublisherPage from './pages/CreatePublisherPage';
import PublisherDetailsPage from './pages/PublisherDetailsPage';
import PublishersListPage from './pages/PublishersListPage';

const PublishersRoutes: RouteConfig[] = [
  { path: '/publishers', element: <PublishersListPage /> },
  { path: '/publishers/create', permissions: ['admin'], element: <CreatePublisherPage />, },
  { path: '/publishers/:id', element: <PublisherDetailsPage /> },
];

export default PublishersRoutes;
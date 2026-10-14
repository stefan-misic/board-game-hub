import { RouteConfig } from '../../types/router.types';
import CreatePublisherPage from './pages/CreatePublisherPage';
import PublisherDetailsPage from './pages/PublisherDetailsPage';
import PublishersListPage from './pages/PublishersListPage';
import UpdatePublisherPage from './pages/UpdatePublisherPage';

const PublishersRoutes: RouteConfig[] = [
  { path: '/publishers', element: <PublishersListPage /> },
  { path: '/publishers/create', permissions: ['admin'], element: <CreatePublisherPage />, },
  { path: '/publishers/:id', element: <PublisherDetailsPage /> },
  { path: '/publishers/:id/update', permissions: ['admin'], element: <UpdatePublisherPage /> }
];

export default PublishersRoutes;
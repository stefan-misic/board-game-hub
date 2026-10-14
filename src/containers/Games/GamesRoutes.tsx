import { RouteConfig } from '../../types/router.types';
import CreateGamePage from './pages/CreateGamePage';
import GamesListPage from './pages/GamesListPage';

const GamesRoutes: RouteConfig[] = [
  { path: '/games', element: <GamesListPage /> },
  { path: '/games/create', permissions: ['admin'], element: <CreateGamePage />, },
];

export default GamesRoutes;
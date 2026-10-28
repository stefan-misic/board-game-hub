import { RouteConfig } from '../../types/router.types';
import CreateGamePage from './pages/CreateGamePage';
import GameDetailsPage from './pages/GameDetailsPage';
import GamesListPage from './pages/GamesListPage';
import UpdateGamePage from './pages/UpdateGamePage';

const GamesRoutes: RouteConfig[] = [
  { path: '/games', element: <GamesListPage /> },
  { path: '/games/create', permissions: ['admin'], element: <CreateGamePage />, },
  { path: '/games/:id', element: <GameDetailsPage /> },
  { path: '/games/:id/update', permissions: ['admin'], element: <UpdateGamePage /> }
];

export default GamesRoutes;
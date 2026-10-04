import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectCurrentUserPermissions } from '../../store/user.slice';

const RouteGuard = ({ requiredPermissions }) => {
  const currentUserPermissions = useSelector(selectCurrentUserPermissions);

  if (requiredPermissions?.length > 0) {
    const hasRequiredPermissions = requiredPermissions.some((permission) =>
      currentUserPermissions?.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return <Navigate to='/unauthorized' />;
    }
  }

  return <Outlet />;
};

export default RouteGuard;


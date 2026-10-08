import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { StoreState } from '../../store';
import { selectCurrentUserPermissions } from '../../store/user.slice';

interface RouteGuardProps {
  requiredPermissions: string[];
}
const RouteGuard = ({ requiredPermissions }: RouteGuardProps) => {
  const currentUserPermissions = useSelector<StoreState, string[] | null | undefined>(selectCurrentUserPermissions);

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


import React from 'react';
import { hasPermission } from '../lib/permissionHelper';

const PermissionChecker = ({ user, neededPermissions, isSelf, children }) => {
  let hasRights = hasPermission(user, neededPermissions, false);
  if (!hasRights && isSelf && neededPermissions.includes('SELF')) {
    hasRights = true;
  }
  return (
    hasRights ? children : <div><p>Nicht ausreichend Berechtigungen vorhanden!</p></div>
  );
};

export default PermissionChecker;

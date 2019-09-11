const hasPermission = (user, permissionsNeeded, willThrow) => {
  /*const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    */
  if (!user.permissions.some(permission => permissionsNeeded.includes(permission))) {
    if (willThrow) {
      throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
    } else {
      return false;
    }
  }
  return true;
};

export { hasPermission };

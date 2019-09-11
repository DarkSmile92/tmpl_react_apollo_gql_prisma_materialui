function hasPermission(user, permissionsNeeded, willThrow) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
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
}

exports.hasPermission = hasPermission;

function isAuthenticated(request) {
  if (!request || !request.userId) {
    throw new Error("you must be signed in!");
  }
}

exports.isAuthenticated = isAuthenticated;

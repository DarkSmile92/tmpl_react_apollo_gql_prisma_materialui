import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { ALL_USERS_QUERY } from '../lib/gqlQueries';
import Button from '@material-ui/core/Button';
import Error from './ErrorMessage';
import { UPDATE_PERMISSIONS_MUTATION } from '../lib/gqlMutations';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'USERCREATE',
  'USERUPDATE',
  'USERDELETE',
  'PERMISSIONUPDATE',
];

const Permissions = props => {
  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY);

  return (
    <div>
      <Error error={error} />
      <div>
        <h2>Manage Permissions</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => (
                <th key={permission}>{permission}</th>
              ))}
              <th>ðŸ‘‡ðŸ»</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserPermissions user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION,
    {
      variables: {
        permissions: permissions,
        userId: user.id,
      },
    }
  );

  const handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    setPermissions(updatedPermissions);
  };

  return (
    <>
      {error && (
        <tr>
          <td colspan="8">
            <Error error={error} />
          </td>
        </tr>
      )}
      <tr>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={e => handlePermissionChange(e)}
              />
            </label>
          </td>
        ))}
        <td>
          <Button
            type="button"
            disabled={loading}
            onClick={() =>
              updatePermissions({
                variables: {
                  permissions: permissions,
                  userId: user.id,
                },
              })
            }>
            Updat{loading ? 'ing' : 'e'}
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Permissions;

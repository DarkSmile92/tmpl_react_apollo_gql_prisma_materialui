import { CURRENT_USER_QUERY } from '../lib/gqlQueries';
import React from 'react';
import { SIGN_OUT_MUTATION } from '../lib/gqlMutations';
import Switch from '@material-ui/core/Switch';
import { useMutation } from '@apollo/react-hooks';

const Signout = ({ isChecked }) => {
  const [signout] = useMutation(SIGN_OUT_MUTATION);

  return (
    <Switch
      checked={isChecked}
      onChange={() =>
        signout({ refetchQueries: [{ query: CURRENT_USER_QUERY }] })
      }
      aria-label="LoginSwitch"
    />
  );
};
export default Signout;

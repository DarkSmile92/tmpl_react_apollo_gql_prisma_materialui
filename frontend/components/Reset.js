import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CURRENT_USER_QUERY } from '../lib/gqlQueries';
import ErrorMessage from './ErrorMessage';
import { RESET_MUTATION } from '../lib/gqlMutations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  form: {},
  error: {},
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 200,
  },
  button: {
    margin: theme.spacing(),
  },
}));

const Reset = ({ resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [
    resetPassword,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(RESET_MUTATION);

  const classes = useStyles();
  return (
    <form
      className={classes.form}
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await resetPassword({
          variables: {
            resetToken,
            password,
            confirmPassword,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        setPassword('');
        setConfirmPassword('');
      }}>
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <h2>Neues Passwort vergeben</h2>
        <ErrorMessage error={mutationError} />
        <TextField
          id="standard-password-input"
          name="password"
          label="Passwort"
          className={classes.textField}
          type="password"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <TextField
          id="standard-confirm-password-input"
          name="confirmPassword"
          label="Passwort bestätigen"
          className={classes.textField}
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Anfordern
        </Button>
      </fieldset>
    </form>
  );
};

export default Reset;

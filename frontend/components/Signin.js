import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CURRENT_USER_QUERY } from '../lib/gqlQueries';
import ErrorMessage from './ErrorMessage';
import { SIGNIN_MUTATION } from '../lib/gqlMutations';
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

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION);

  return (
    <form
      className={classes.form}
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await signin({
          variables: {
            email,
            password,
          },
          refetchQueries: [
            {
              query: CURRENT_USER_QUERY,
            },
          ],
        });
        setEmail('');
        setPassword('');
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Anmelden</h2>
        <ErrorMessage error={error} />
        <TextField
          id="email"
          name="email"
          label="E-Mail"
          className={classes.textField}
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          autoComplete="current-email"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-password-input"
          name="password"
          label="Passwort"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          value={password}
          margin="normal"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Login
        </Button>
      </fieldset>
    </form>
  );
};

export default Signin;

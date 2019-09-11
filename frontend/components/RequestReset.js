import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import ErrorMessage from './ErrorMessage';
import { REQUEST_RESET_MUTATION } from '../lib/gqlMutations';
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

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [requestReset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  const classes = useStyles();
  return (
    <form
      className={classes.form}
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await requestReset({ variables: { email } });
        setEmail('');
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Passwort zurücksetzen</h2>
        <ErrorMessage error={error} />
        {!error && !loading && called && (
          <p>Erfolg! Prüfen Sie Ihre E-Mails für den Reset-Token.</p>
        )}
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

export default RequestReset;

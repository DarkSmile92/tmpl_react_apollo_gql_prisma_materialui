import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CURRENT_USER_QUERY } from '../lib/gqlQueries';
import ErrorMessage from './ErrorMessage';
import { SIGNUP_MUTATION } from '../lib/gqlMutations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';

// import { SIGNUP_MUTATION } from '../lib/gqlMutations';

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

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  workerNo: '',
};

const Signup = props => {
  const [state, setState] = useState(initialState);
  const classes = useStyles();
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  return (
    <form
      className={classes.form}
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await signup({
          variables: {
            email: state.email.trim(),
            firstName: state.firstName.trim(),
            lastName: state.lastName.trim(),
            password: state.password.trim(),
            workerNo: state.workerNo.trim(),
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        setState(initialState);
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Benutzerkonto erstellen</h2>
        <ErrorMessage error={error} />
        <TextField
          id="firstName"
          name="firstName"
          label="Vorname"
          className={classes.textField}
          value={state.firstName}
          onChange={e => setState({ ...state, firstName: e.target.value })}
          margin="normal"
          required
        />
        <br />
        <TextField
          id="lastName"
          name="lastName"
          label="Nachname"
          className={classes.textField}
          value={state.lastName}
          onChange={e => setState({ ...state, lastName: e.target.value })}
          margin="normal"
          required
        />
        <br />
        <TextField
          id="email"
          name="email"
          label="E-Mail"
          className={classes.textField}
          value={state.email}
          onChange={e => setState({ ...state, email: e.target.value })}
          type="email"
          autoComplete="current-email"
          margin="normal"
          required
        />
        <br />
        <TextField
          id="standard-password-input"
          name="password"
          label="Passwort"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={state.password}
          onChange={e => setState({ ...state, password: e.target.value })}
          required
        />
        <br />
        <TextField
          id="workerNo"
          name="workerNo"
          label="Mitarbeiter Nr"
          className={classes.textField}
          value={state.workerNo}
          onChange={e => setState({ ...state, workerNo: e.target.value })}
          margin="normal"
          required
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit">
          Erstellen
        </Button>
      </fieldset>
    </form>
  );
};

export default Signup;

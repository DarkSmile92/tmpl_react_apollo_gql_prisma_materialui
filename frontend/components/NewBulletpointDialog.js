import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CREATE_BULLETPOINT_MUTATION } from '../lib/gqlMutations';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorMessage from './ErrorMessage';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(),
    width: '100%',
  },
  buttonDelete: {
    margin: theme.spacing(),
    width: '100%',
    backgroundColor: 'red!important',
  },
  card: {
    maxWidth: '100%',
  },
  flex: {
    flex: 1,
  },
}));

const NewBulletpointDialog = ({
  onClose,
  onCloseCreate,
  showNewDialog,
  itemCategory,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [closedDate, setClosedDate] = useState(null);
  const [notes, setNotes] = useState('');
  const classes = useStyles();

  const [createBulletpointm, { error }] = useMutation(
    CREATE_BULLETPOINT_MUTATION
  );

  const onCloseCreateLoc = async () => {
    const res = await createBulletpoint({
      variables: {
        title,
        category,
        dueDate,
        closedDate,
        notes,
      },
    });
    onCloseCreate();
  };

  const _handleDialogKeyUp = event => {
    if (event.keyCode === 13) {
      // enter
      onCloseCreate();
    }
  };

  return (
    <Dialog
      open={showNewDialog}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Neuer Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Titel eingeben</DialogContentText>
        <ErrorMessage error={error} />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Titel"
          fullWidth
          onChange={e => setTitle(e.target.value)}
          onKeyUp={event => {
            if (event.keyCode === 13) {
              setCategory(itemCategory);
              onCloseCreateLoc();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          color="primary"
          className={classes.button}>
          Abbrechen
        </Button>
        <Button
          onClick={e => {
            setCategory(itemCategory);
            onCloseCreateLoc(createBulletpoint);
          }}
          color="primary"
          className={classes.button}>
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewBulletpointDialog;

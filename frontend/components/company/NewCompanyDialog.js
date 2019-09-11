import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CREATE_COMPANY_MUTATION } from '../../lib/gqlMutations';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorMessage from './ErrorMessage';
import LoadingCircle from '../LoadingCircle';
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

const NewCompanyDialog = ({
  onClose,
  onCloseCreate,
  showNewDialog,
  itemCategory,
}) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('http://acmelogos.com/images/logo-1.svg');
  const [notes, setNotes] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [website, setWebsite] = useState('');
  const [zip, setZip] = useState('');
  const classes = useStyles();
  const [
    addCompany,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_COMPANY_MUTATION);

  const onCloseCreateLoc = async () => {
    const res = await addCompany({
      variables: {
        name,
        logo,
        notes,
        phone,
        mobile,
        fax,
        email,
        street,
        houseNo,
        website,
        zip,
      },
    });
    if (!mutationError) onCloseCreate();
  };

  const _handleDialogKeyUp = event => {
    if (event.keyCode === 13) {
      // enter
      onCloseCreateLoc();
    }
  };

  return (
    <Dialog
      open={showNewDialog}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Neues Unternehmen</DialogTitle>
      <DialogContent>
        <DialogContentText>Daten eingeben</DialogContentText>
        <ErrorMessage error={mutationError} />
        {mutationLoading && <LoadingCircle />}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="name"
          fullWidth
          onChange={e => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="logo"
          name="logo"
          label="logo"
          fullWidth
          onChange={e => setLogo(e.target.value)}
        />
        <TextField
          margin="dense"
          id="notes"
          name="notes"
          label="notes"
          fullWidth
          onChange={e => setNotes(e.target.value)}
        />
        <TextField
          margin="dense"
          id="phone"
          name="phone"
          label="phone"
          fullWidth
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          id="mobile"
          name="mobile"
          label="mobile"
          fullWidth
          onChange={e => setMobile(e.target.value)}
        />
        <TextField
          margin="dense"
          id="fax"
          name="fax"
          label="fax"
          fullWidth
          onChange={e => setFax(e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="email"
          fullWidth
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="street"
          name="street"
          label="street"
          fullWidth
          onChange={e => setStreet(e.target.value)}
        />
        <TextField
          margin="dense"
          id="houseNo"
          name="houseNo"
          label="houseNo"
          fullWidth
          onChange={e => setHouseNo(e.target.value)}
        />
        <TextField
          margin="dense"
          id="website"
          name="website"
          label="website"
          fullWidth
          onChange={e => setWebsite(e.target.value)}
        />
        <TextField
          margin="dense"
          id="zip"
          name="zip"
          label="zip"
          fullWidth
          onChange={e => setZip(e.target.value)}
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
            onCloseCreateLoc();
          }}
          color="primary"
          className={classes.button}
          disabled={mutationLoading}>
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCompanyDialog;

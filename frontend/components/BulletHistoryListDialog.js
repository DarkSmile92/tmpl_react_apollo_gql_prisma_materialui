import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import { DELETE_BULLETPOINT_MUTATION } from '../lib/gqlMutations';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorMessage from './ErrorMessage';
import { HISTORY_BULLETPOINTS_QUERY } from '../lib/gqlQueries';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';

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
    backgroundColor: 'red!important',
    marginLeft: '2rem!important',
  },
  card: {
    maxWidth: '100%',
  },
  flex: {
    flex: 1,
  },
  table: {},
}));

const BulletHistoryListDialog = props => {
  const { fullScreen } = props;
  const classes = useStyles();
  const { data, error, loading, refetch } = useQuery(
    HISTORY_BULLETPOINTS_QUERY
  );
  const [deleteBulletpoint] = useMutation(DELETE_BULLETPOINT_MUTATION);

  const updateCache = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: HISTORY_BULLETPOINTS_QUERY });
    // 2. Filter the deleted itemout of the page
    data.myBulletpointsHistory = data.myBulletpointsHistory.filter(
      item => item.id !== payload.data.deleteBulletpoint.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: HISTORY_BULLETPOINTS_QUERY, data });
  };

  return (
    <div>
      {error && <ErrorMessage erorr={error} />}
      {loading && <p>Loading ...</p>}
      {!loading && !error && (
        <Dialog
          fullScreen={fullScreen}
          open={props.open}
          onClose={props.handleClose}
          onEnter={() => refetch()}
          aria-labelledby="history-items-dialog">
          <DialogTitle id="history-items-dialog">
            {'Entfernte Aktivitäten'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Liste aller Aktivitäten, die vom Board gelöscht wurden.
            </DialogContentText>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Titel</TableCell>
                    <TableCell>Entfernt am</TableCell>
                    <TableCell>Löschen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.myBulletpointsHistory.map(item => {
                    return (
                      <Mutation
                        mutation={DELETE_BULLETPOINT_MUTATION}
                        variables={{ id: item.id }}
                        update={updateCache}
                        key={item.id}>
                        {deleteBulletpoint => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              {item.title}
                            </TableCell>
                            <TableCell>
                              <Moment format="DD.MM.YYYY">
                                {item.closedDate}
                              </Moment>
                            </TableCell>
                            <TableCell>
                              <Button
                                className={classes.deleteButton}
                                onClick={() => {
                                  deleteBulletpoint({
                                    variables: { id: item.id },
                                    refetchQueries: [
                                      { query: HISTORY_BULLETPOINTS_QUERY },
                                    ],
                                  });
                                  // refetch();
                                }}>
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </Mutation>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BulletHistoryListDialog;

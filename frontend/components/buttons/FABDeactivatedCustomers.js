import Fab from '@material-ui/core/Fab';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(),
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(),
  },
}));

const FABDeactivatedCustomers = ({ title, onClicked }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={onClicked}>
        <PlaylistAddCheckIcon />
      </Fab>
    </Tooltip>
  );
};

export default FABDeactivatedCustomers;

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(),
  },
}));

const FABAddButton = ({ title, onClicked }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={onClicked}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default FABAddButton;

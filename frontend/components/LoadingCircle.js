import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const LoadingCircle = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} />;
};

export default LoadingCircle;

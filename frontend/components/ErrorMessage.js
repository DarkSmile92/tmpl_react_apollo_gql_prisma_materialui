import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '2rem',
    background: 'white',
    margin: '2rem 0',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderLeft: '5px solid red',
  },
  block: {
    margin: 0,
    fontWeight: 100,
  },
  strong: {
    marginRight: '1rem',
  },
}));

const DisplayError = ({ error }) => {
  const classes = useStyles();
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div className={classes.container} key={i}>
        <p className={classes.block} data-test="graphql-error">
          <strong className={classes.strong}>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div className={classes.container}>
      <p className={classes.block} data-test="graphql-error">
        <strong className={classes.strong}>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;

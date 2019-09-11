import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@keyframes resizeAnimation': {
    from: {
      height: 'initial',
    },
    to: {
      height: '100%',
    },
  },
  eye: {
    width: 200,
    height: 200,
    background: 'white',
    transform: 'rotate(45deg)',
    borderRadius: '75% 0',
    overflow: 'hidden',
    // '&:hover > .shut span': {
    //   height: '100%',
    // },
  },
  ball: {
    width: 40,
    height: 40,
    background: '#222f3e',
    borderRadius: '50%',
    border: '30px solid #576574',
  },
  shut: {
    width: 300,
    height: 160,
    transform: 'rotate(-45deg)',
    zIndex: 999,
  },
  shutInner: {
    background: '#ff6b6b',
    display: 'block',
    width: '100%',
    height: '20%',
    borderRadius: '0 0 60% 60%',
    transition: '0.4s all',
    animation: '1s resizeAnimation',
  },
}));

const EyeBall = () => {
  const classes = useStyles();

  return (
    <div className={classes.eye}>
      <div className={classes.shut}>
        <span className={classes.shutInner} />
      </div>
      <div className={classes.ball} />
    </div>
  );
};

export default EyeBall;

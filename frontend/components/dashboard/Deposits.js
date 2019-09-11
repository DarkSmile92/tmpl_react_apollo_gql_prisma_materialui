/* eslint-disable no-script-url */

import Link from '@material-ui/core/Link';
import React from 'react';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import faker from 'faker/locale/de';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
moment.locale('de');

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = () => {
  const classes = useStyles();
  return (
    <>
      <Title>Recently published</Title>
      <Typography component="p" variant="h4">
        {faker.commerce.price()} &euro;
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {moment().format('DD MMM YYYY')}
      </Typography>
      <div>
        <Link color="primary" href="/">
          View published
        </Link>
      </div>
    </>
  );
};

export default Deposits;

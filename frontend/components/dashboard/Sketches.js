/* eslint-disable no-script-url */

import Link from '@material-ui/core/Link';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
// import faker from 'faker';
import faker from 'faker/locale/de';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

moment.locale('de');

// Generate Order Data
function createData(id, date, name, shipTo, platform, authorName, amount) {
  return { id, date, name, shipTo, platform, authorName, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Aldi',
    'Facebook',
    'Robin Kretzschmar',
    312.44
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'Bünting',
    'Instagram',
    'Robin Kretzschmar',
    866.99
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'Lidl',
    'Facebook',
    'Robin Kretzschmar',
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'AERONICS',
    'Blog',
    'Robin Kretzschmar',
    654.39
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Metro Group',
    'Facebook',
    'Robin Kretzschmar',
    212.79
  ),
];

const generateDataRows = numOfRows => {
  let rows = [];
  for (let rIdx = 0; rIdx < numOfRows; rIdx++) {
    rows.push(
      createData(
        rIdx,
        faker.date.recent(),
        faker.name.findName(),
        faker.company.companyName(),
        rIdx % 2 === 0 ? 'Facebook' : 'Instagram',
        'Robin Kretzschmar',
        faker.finance.amount()
      )
    );
  }
  return rows;
};

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Sketches = () => {
  const classes = useStyles();
  return (
    <>
      <Title>Recent Sketches</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Ranking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateDataRows(5).map(row => (
            <TableRow key={row.id}>
              <TableCell>{moment(row.date).format('DD.MM.YYYY')}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.platform}</TableCell>
              <TableCell>{row.authorName}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/sketches">
          See more sketches
        </Link>
      </div>
    </>
  );
};

export default Sketches;

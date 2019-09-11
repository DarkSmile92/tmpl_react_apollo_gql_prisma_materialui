import {
  COMPANIES_CONNECTION_QUERY,
  COMPANIES_PAGED_QUERY,
} from '../../lib/gqlQueries';
import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import ErrorMessage from '../ErrorMessage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import LoadingCircle from '../LoadingCircle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import cc from 'classcat';
import { useQuery } from '@apollo/react-hooks';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
});

const TablePaginationActions = ({
  classes,
  count,
  onChangePage,
  page,
  rowsPerPage,
  theme,
}) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true,
})(TablePaginationActions);

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

const CompanyList = ({ currentUser }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const {
    loading: companiesLoading,
    error: companiesError,
    data: companies,
    refetch: refetchCompanies,
  } = useQuery(COMPANIES_PAGED_QUERY, {
    variables: {
      skip: page * rowsPerPage,
      first: rowsPerPage,
    },
  });
  const {
    loading: ccountLoading,
    error: ccountError,
    data: ccount,
    refetch: ccountRefetch,
  } = useQuery(COMPANIES_CONNECTION_QUERY);

  return (
    <Paper className={cc([classes.root, classes.topSpacer])}>
      <Typography variant="h3">Unternehmen</Typography>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Website</TableCell>
          </TableRow>
        </TableHead>
        {companiesLoading && <LoadingCircle />}
        {!companiesLoading && !companiesError && companies && (
          <TableBody>
            {companies.companiesPaged.map(company => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {!companiesLoading && companiesError && (
          <ErrorMessage error={companiesError} />
        )}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100, 150]}
              colSpan={3}
              count={
                ccount && ccount.companiesConnection
                  ? ccount.companiesConnection.aggregate.count
                  : 1
              }
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true,
              }}
              onChangePage={(event, page) => {
                setPage(page);
                ccountRefetch();
              }}
              onChangeRowsPerPage={event => {
                setPage(0);
                setRowsPerPage(parseInt(event.target.value));
                ccountRefetch();
              }}
              ActionsComponent={TablePaginationActionsWrapped}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default CompanyList;

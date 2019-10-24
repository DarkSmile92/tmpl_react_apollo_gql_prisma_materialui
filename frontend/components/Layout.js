import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import BrandedAppBar from '../components/appBar';
import BrandedDrawer from '../components/drawer';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorBoundary from './ErrorBoundary';
import Link from '@material-ui/core/Link';
import Meta from '../components/Meta';
import { Paper } from '@material-ui/core';
import { ThemeContext } from '../components/contexts/ThemeContext';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { useTheme } from '@material-ui/styles';

const AppWrapper = styled.div`
  /*max-width: calc(768px + 16px * 2);*/
  min-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  /*padding: 0 16px;*/
  padding: 0;
  flex-direction: column;
`;

// import Header from '../components/Header';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://robscode.onl/">
        PROJECTNAME
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Page = ({ curUser, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const { currentTheme, setTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <AppWrapper>
        <div className={classes.root}>
          <CssBaseline />
          <BrandedAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <BrandedDrawer open={open} handleDrawerClose={handleDrawerClose} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Container>
            <Copyright />
          </main>
        </div>
      </AppWrapper>
    </MuiThemeProvider>
  );
};

export default Page;

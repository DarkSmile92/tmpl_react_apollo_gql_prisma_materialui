import React, { useContext } from 'react';

import Dashboard from '../components/dashboard';
import { DesignDrawerWidth } from '../helpers/constants';
import LoadingCircle from '../components/LoadingCircle';
import { MenuContext } from '../components/contexts/MenuContextProvider';
import PleaseSignIn from '../components/PleaseSignIn';
import { ThemeContext } from '../components/contexts/ThemeContext';
import { USER_SETTINGS_QUERY } from '../lib/gqlQueries';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  header: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white',
  },
  logo: {
    height: 80,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { mainDrawerOpen } = useContext(MenuContext);
  const { currentTheme, setTheme } = React.useContext(ThemeContext);
  const { loading, error, data, refetch } = useQuery(USER_SETTINGS_QUERY);

  const updateThemeSettings = userSettings => {
    const modifiedTheme = createMuiTheme({
      palette: {
        primary: {
          main: userSettings.themeColorPrimary,
        },
        secondary: {
          main: userSettings.themeColorSecondary,
        },
      },
    });
    setTheme(modifiedTheme);
  };

  const themeNeedsUpdate = userSettings => {
    if (!userSettings) {
      return false;
    }
    if (
      userSettings.themeColorPrimary &&
      userSettings.themeColorPrimary !== currentTheme.palette.primary.main
    ) {
      return true;
    }
    if (
      userSettings.themeColorSecondary &&
      userSettings.themeColorSecondary !== currentTheme.palette.secondary.main
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div
        /*style={{
          marginLeft: mainDrawerOpen ? DesignDrawerWidth + 73 : 73,
        }}*/
        className={classes.topSpacer}>
        <PleaseSignIn>
          {loading && <LoadingCircle />}
          {!loading &&
            !error &&
            data &&
            themeNeedsUpdate(data.userSettings) &&
            updateThemeSettings(data.userSettings)}
          {!loading && !error && <Dashboard userSettings={data.userSettings} />}
        </PleaseSignIn>
      </div>
    </div>
  );
};

export default Home;

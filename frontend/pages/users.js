import * as GlobalConstants from '../helpers/constants';

import PleaseSignIn from '../components/PleaseSignIn';
import Users from '../components/Users';
import { makeStyles } from '@material-ui/styles';

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

const UsersPage = ({ mainDrawerOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <PleaseSignIn>
        <div
          style={{
            marginLeft: mainDrawerOpen ? GlobalConstants.DesignDrawerWidth : 73,
          }}
          className={classes.topSpacer}>
          <header className={classes.header}>
            <img src="/static/logo.svg" className={classes.logo} alt="logo" />
          </header>
          <Users />
        </div>
      </PleaseSignIn>
    </div>
  );
};

export default UsersPage;

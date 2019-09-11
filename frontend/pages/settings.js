import * as GlobalConstants from '../helpers/constants';

import CurUser from '../components/CurUser';
import PleaseSignIn from '../components/PleaseSignIn';
import SettingsForm from '../components/settingsForm';
import { makeStyles } from '@material-ui/styles';

// import UpdateSettings from '../components/UpdateSettings';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const SettingsPage = ({ mainDrawerOpen }) => {
  const classes = useStyles();
  return (
    <div>
      <PleaseSignIn>
        <CurUser>
          {({ curUserData, curUserLoading, curUserError }) => (
            <div
              style={{
                marginLeft: mainDrawerOpen
                  ? GlobalConstants.DesignDrawerWidth
                  : 73,
              }}
              className={classes.topSpacer}>
              <SettingsForm id={curUserData.me.id} />
            </div>
          )}
        </CurUser>
      </PleaseSignIn>
    </div>
  );
};

export default SettingsPage;

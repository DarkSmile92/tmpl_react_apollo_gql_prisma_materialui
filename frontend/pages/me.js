import * as GlobalConstants from '../helpers/constants';

import CurUser from '../components/CurUser';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateUser from '../components/UpdateUser';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const MePage = ({ mainDrawerOpen }) => {
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
              {curUserData.me.id && <UpdateUser id={curUserData.me.id} />}
            </div>
          )}
        </CurUser>
      </PleaseSignIn>
    </div>
  );
};

export default MePage;

import * as GlobalConstants from '../helpers/constants';

import CompanyList from '../components/company/CompanyList';
import PleaseSignIn from '../components/PleaseSignIn';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const PriosPage = ({ mainDrawerOpen }) => {
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
              <CompanyList currentUser={curUserData.me} />
            </div>
          )}
        </CurUser>
      </PleaseSignIn>
    </div>
  );
};

export default PriosPage;

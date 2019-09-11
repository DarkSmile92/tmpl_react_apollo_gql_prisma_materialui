import * as GlobalConstants from '../helpers/constants';

import Bulletpoints from '../components/Bulletpoints';
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
        {/*<Users page={parseFloat(query.page) || 1}/>*/}
        <div
          style={{
            marginLeft: mainDrawerOpen ? GlobalConstants.DesignDrawerWidth : 73,
          }}
          className={classes.topSpacer}>
          <Bulletpoints />
        </div>
      </PleaseSignIn>
    </div>
  );
};

export default PriosPage;

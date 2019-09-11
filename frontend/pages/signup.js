import Grid from '@material-ui/core/Grid';
import RequestReset from '../components/RequestReset';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SignupPage = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item xs={12}>
        <Grid
          container
          className={classes.demo}
          justify="center"
          spacing={Number(16)}>
          <Grid item>
            <Signup />
          </Grid>
          <Grid item>
            <Signin />
          </Grid>
          <Grid item>
            <RequestReset />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;

import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';

const defaultTheme = createMuiTheme({
  palette: {
    // primary: deepOrange,
    primary: {
      main: '#155787',
    },
    secondary: orange,
  },
});

export default defaultTheme;

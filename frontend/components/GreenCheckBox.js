import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/styles';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default GreenCheckbox;

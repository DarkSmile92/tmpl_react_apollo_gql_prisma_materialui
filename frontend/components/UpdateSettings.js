import {
  CREATE_SETTINGS_MUTATION,
  UPDATE_SETTINGS_MUTATION,
} from '../lib/gqlMutations';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { USER_SETTINGS_QUERY } from '../lib/gqlQueries';
import cc from 'classcat';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  topSpacer: {
    paddingTop: theme.spacing(8),
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(),
  },
}));

// class UpdateSettings extends Component {
const UpdateSettings = () => {
  // state = {};
  const [boardPrioCaptions, setBoardPrioCaptions] = useState(['', '', '']);
  const [themeColorPrimary, setThemeColorPrimary] = useState('');
  const [themeColorSecondary, setThemeColorSecondary] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const classes = useStyles();
  const [updateSettings, { loading: updateSettingsLoading }] = useMutation(
    UPDATE_SETTINGS_MUTATION
  );
  const [createSettings, { loading: createSettingsLoading }] = useMutation(
    CREATE_SETTINGS_MUTATION
  );
  const { loading, error, data, refetch } = useQuery(USER_SETTINGS_QUERY);

  const doUpdateSettings = async (e, settingsId) => {
    // e.preventDefault();
    setIsDirty(false);
    const res = await updateSettings({
      variables: {
        id: settingsId,
        boardPrioCaptions: boardPrioCaptions,
        themeColorPrimary: themeColorPrimary,
        themeColorSecondary: themeColorSecondary,
      },
      refetchQueries: [{ query: USER_SETTINGS_QUERY }],
    });
  };

  const queryToState = data => {
    if (data && data.userSettings && !isDirty) {
      console.log('queryToState');
      if (boardPrioCaptions !== data.userSettings.boardPrioCaptions) {
        setBoardPrioCaptions(data.userSettings.boardPrioCaptions);
        setIsDirty(false);
      }
    }
  };

  // render() {

  return (
    <div className={cc([classes.container, classes.topSpacer])}>
      {loading && <p>Loading...</p>}
      {!loading && !data.userSettings && (
        <div>
          <Typography>Keine Daten.</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() =>
              createSettings({
                variables: {
                  boardPrioCaptions: ['Prio1', 'Prio2', 'Erledigt'],
                  themeColorPrimary: '',
                  themeColorSecondary: '',
                },
                refetchQueries: [{ query: USER_SETTINGS_QUERY }],
              })
            }>
            Anlegen!
          </Button>
        </div>
      )}
      {!loading && data.userSettings && (
        <Paper className={classes.paper} elevation={1}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Namensgebung
              </Typography>
              <Typography variant="h5" component="h2">
                Namen der Prio-Spalten
              </Typography>
              {Array.from(Array(5).keys()).map(idx => (
                <TextField
                  disabled={updateSettingsLoading}
                  id={`boardPrioCaptions${idx}`}
                  label={`Name 'Prio ${idx + 1}'`}
                  className={classes.textField}
                  value={boardPrioCaptions[idx]}
                  onChange={e => {
                    const { name, type, value } = e.target;
                    if (boardPrioCaptions.length >= idx) {
                      const newArray = boardPrioCaptions;
                      newArray[idx] = value;
                      setBoardPrioCaptions(newArray);
                      setIsDirty(true);
                    } else {
                      const newArray = boardPrioCaptions;
                      for (
                        const aIdx = 0;
                        aIdx < idx - boardPrioCaptions.length;
                        aIdx++
                      ) {
                        newArray.push(`Prio ${idx + 1}`);
                      }
                      newArray[idx] = value;
                      setBoardPrioCaptions(newArray);
                      setIsDirty(true);
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  key={`boardPrio_${idx}`}
                />
              ))}
            </CardContent>
            <CardActions>
              <Button
                disabled={updateSettingsLoading || !isDirty}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={e =>
                  doUpdateSettings(e, updateSettings, data.userSettings.id)
                }>
                Speicher{updateSettingsLoading ? 't...' : 'n'}
              </Button>
            </CardActions>
          </Card>
        </Paper>
      )}
    </div>
  );
  // }
};

UpdateSettings.getInitialProps = async ctx => {
  return {};
};

export default UpdateSettings;

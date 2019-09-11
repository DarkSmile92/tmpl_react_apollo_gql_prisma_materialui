import { useMutation, useQuery } from '@apollo/react-hooks';

import Checkbox from '@material-ui/core/Checkbox';
import ColorPicker from 'material-ui-color-picker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LoadingCircle from '../LoadingCircle';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeContext } from '../contexts/ThemeContext';
import Typography from '@material-ui/core/Typography';
import { UPDATE_SETTINGS_MUTATION } from '../../lib/gqlMutations';
import { USER_SETTINGS_QUERY } from '../../lib/gqlQueries';
import { createMuiTheme } from '@material-ui/core/styles';

// import { useTheme } from '@material-ui/styles';

const SettingsForm = () => {
  const { currentTheme, setTheme } = React.useContext(ThemeContext);
  const {
    loading: userSettingsLoading,
    error: userSettingsError,
    data: userSettings,
    refetch: userSettingsRefetch,
  } = useQuery(USER_SETTINGS_QUERY);
  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION);

  const updateThemePrimaryColor = async (newColor, settingsId) => {
    const modifiedTheme = createMuiTheme({
      palette: {
        primary: {
          main: newColor,
        },
        secondary: currentTheme.palette.secondary,
      },
    });
    setTheme(modifiedTheme);
    updateSettings({
      variables: {
        id: settingsId,
        themeColorPrimary: currentTheme.palette.primary.main,
        themeColorSecondary: currentTheme.palette.secondary.main,
      },
    });
  };

  const updateThemeSecondaryColor = async (newColor, settingsId) => {
    const modifiedTheme = createMuiTheme({
      palette: {
        primary: currentTheme.palette.primary,
        secondary: {
          main: newColor,
        },
      },
    });
    setTheme(modifiedTheme);
    updateSettings({
      variables: {
        id: settingsId,
        themeColorPrimary: currentTheme.palette.primary.main,
        themeColorSecondary: currentTheme.palette.secondary.main,
      },
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Einstellungen
      </Typography>
      {userSettingsLoading && <LoadingCircle />}
      {!userSettingsLoading && userSettings && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ColorPicker
              name="color"
              defaultValue={currentTheme.palette.primary.main}
              // value={this.state.color} - for controlled component
              onChange={color =>
                updateThemePrimaryColor(color, userSettings.userSettings.id)
              }
              label="Primäre Farbe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ColorPicker
              name="color"
              defaultValue={currentTheme.palette.secondary.main}
              // value={this.state.color} - for controlled component
              onChange={color =>
                updateThemeSecondaryColor(color, userSettings.userSettings.id)
              }
              label="Sekundäre Farbe"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      )}
      {!userSettingsLoading && !userSettings && (
        <div>Keine Einstellungen vorhanden.</div>
      )}
    </React.Fragment>
  );
};

export default SettingsForm;

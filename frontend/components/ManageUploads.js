import 'moment/locale/de';

import { useMutation, useQuery } from '@apollo/react-hooks';

import DeleteIcon from '@material-ui/icons/Delete';
import ErrorMessage from './ErrorMessage';
import { FILES_QUERY } from '../lib/gqlQueries';
import { FILE_DELETE_MUTATION } from '../lib/gqlMutations';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import cc from 'classcat';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

moment.locale('de');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topSpacer: {
    paddingTop: theme.spacing(8),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  gridContainer: {
    flexGrow: 1,
    maxWidth: 752,
  },
  button: {
    margin: theme.spacing(),
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
  },
}));

const formatTimestamp = timestamp => {
  return moment(timestamp).format('DD.MM.YYYY HH:mm');
};

const ManageUploads = () => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(FILES_QUERY);
  const [deleteFile] = useMutation(FILE_DELETE_MUTATION);

  return (
    <Grid
      container
      spacing={10}
      justify="center"
      className={cc([classes.root, classes.topSpacer])}>
      <Grid item xs={12} md={12}>
        <Typography variant="h3">Hochgeladene Dateien verwalten</Typography>
      </Grid>

      {loading && <p>Loading...</p>}
      {!loading && error && <ErrorMessage error={error} />}
      {!loading && !error && data.files && (
        <Grid item xs={12} md={6}>
          {data.files.map((sFile, sFileIdx) => (
            <List dense key={`flk${sFileIdx}`}>
              <ListItem divider>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${sFile.filename}`}
                  secondary={`Hochgeladen: ${formatTimestamp(sFile.createdAt)}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={() =>
                      deleteFile({
                        variables: { id: sFile.id },
                        refetchQueries: [{ query: FILES_QUERY }],
                      })
                    }>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ManageUploads;

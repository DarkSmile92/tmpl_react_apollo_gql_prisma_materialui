import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import { FILES_QUERY } from '../lib/gqlQueries';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { UPLOAD_FILES_MUTATION } from '../lib/gqlMutations';
import { useMutation } from '@apollo/react-hooks';

const UploadFile = () => {
  const [state, setState] = useState({
    snackMsg: '',
    showSnack: false,
    isUploading: false,
  });
  const [uploadFiles] = useMutation(UPLOAD_FILES_MUTATION);

  return (
    <div>
      <h1>Upload File</h1>
      <Dropzone
        onDrop={async files => {
          setState({ ...state, isUploading: true });
          const response = await uploadFiles({
            variables: { files },
            refetchQueries: [{ query: FILES_QUERY }],
          });
          setState({ ...state, isUploading: false });
          // console.log(response);
          if (
            response.data.uploadFiles &&
            response.data.uploadFiles.length > 0
          ) {
            setState({
              snackMsg: `${response.data.uploadFiles.length} Dateien hochgeladen.`,
              showSnack: true,
            });
          }
        }}
        style={{ flex: 1 }}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {state.isUploading ? (
                <LinearProgress />
              ) : isDragActive ? (
                <p>Dateien hier ablegen...</p>
              ) : (
                <p>Dateien hier ablegen oder klicken für Auswahldialog</p>
              )}
            </div>
          );
        }}
      </Dropzone>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state.showSnack}
        onClose={() => setState({ snackMsg: '', showSnack: false })}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{state.snackMsg}</span>}
      />
    </div>
  );
};

export default UploadFile;

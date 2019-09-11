import * as GlobalConstants from '../helpers/constants';

import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { CLOSE_BULLETPOINT_MUTATION } from '../lib/gqlMutations';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(),
    width: '100%',
  },
  buttonDelete: {
    margin: theme.spacing(),
    backgroundColor: 'red!important',
    marginLeft: '2rem!important',
  },
  card: {
    maxWidth: '100%',
  },
  flex: {
    flex: 1,
  },
}));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, draggingOver) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging
    ? GlobalConstants.ColorCiOrange
    : GlobalConstants.ColorCiBrown,

  // if dragged over delete, shrink maxWidth: draggingOver === 'droppableDelete' ?
  // '5%' : draggableStyle.width, styles we need to apply on draggables
  ...draggableStyle,
});

const Bulletpoint = ({ bulletObject, onDeleted, provided, snapshot }) => {
  const [hover, setHover] = useState(false);
  const [id, setId] = useState('');
  const [closeBulletpoint] = useMutation(CLOSE_BULLETPOINT_MUTATION);

  const doClose = async () => {
    const res = await closeBulletpoint({
      variables: {
        id: bulletObject.id,
      },
    });
    onDeleted();
  };

  const classes = useStyles();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        snapshot.draggingOver
      )}>
      <Card className={classes.card}>
        <CardContent>
          {bulletObject.title}
          {hover && (
            <Button className={classes.buttonDelete} onClick={e => doClose()}>
              <DeleteIcon />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bulletpoint;

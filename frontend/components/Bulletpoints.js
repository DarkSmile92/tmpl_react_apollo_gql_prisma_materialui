import * as GlobalConstants from '../helpers/constants';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MY_BULLETPOINTS_QUERY, USER_SETTINGS_QUERY } from '../lib/gqlQueries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import BulletHistoryListDialog from './BulletHistoryListDialog';
import Bulletpoint from './Bulletpoint';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ErrorMessage from './ErrorMessage';
import HistoryIcon from '@material-ui/icons/History';
import NewBulletpointDialog from './NewBulletpointDialog';
import { UPDATE_BULLETPOINT_MUTATION } from '../lib/gqlMutations';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(),
    width: '100%',
  },
  heading: {
    textAlign: 'center',
  },
  smButton: {
    margin: theme.spacing(),
  },
  buttonDelete: {
    margin: theme.spacing(),
    width: '100%',
    backgroundColor: 'red!important',
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

const getListStyle = (isDraggingOver, numCols) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  // width: 250, width: '25vw',
  width: numCols === 3 ? '25%' : `${100 / numCols}%`,
  float: 'left',
  margin: '1rem',
  // scroll:
  maxHeight: '70vh',
  overflow: 'auto',
});

const Bulletpoints = () => {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newItemPrio, setNewItemPrio] = useState(0);
  const [showBulletHistoryDialog, setShowBulletHistoryDialog] = useState(false);
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(MY_BULLETPOINTS_QUERY);
  const {
    loading: userSettingsLoading,
    error: userSettingsError,
    data: userSettings,
    refetch: userSettingsRefetch,
  } = useQuery(USER_SETTINGS_QUERY);
  const [updateBulletpoint] = useMutation(UPDATE_BULLETPOINT_MUTATION);

  const onCloseNewItemDialog = () => {
    setShowNewDialog(false);
    setNewItemPrio(0);
  };

  const onCloseCreate = () => {
    setShowNewDialog(false);
    setNewItemPrio(0);
  };

  const _numOfCols = settings => {
    // let cols = 3;
    const cols =
      settings.boardPrioCaptions.length > 0
        ? settings.boardPrioCaptions.length
        : 3;
    // if (this.props.userSettings && this.props.userSettings.boardPrioExtra1Name) {
    //   cols++; } if (this.props.userSettings &&
    // this.props.userSettings.boardPrioExtra2Name) {   cols++; }
    return cols;
  };

  const addNewItem = prio => {
    setShowNewDialog(true);
    setNewItemPrio(prio);
  };

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list || non movable item
    if (!destination || result.draggableId.includes('NoMovable')) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const updateItemId = result.draggableId;
      let newCategory = 0;

      switch (destination.droppableId) {
        case 'droppable':
          newCategory = 0;
          break;

        case 'droppable2':
          newCategory = 1;
          break;

        case 'droppable3':
          newCategory = 2;
          break;

        case 'droppable4':
          newCategory = 3;
          break;

        case 'droppable5':
          newCategory = 4;
          break;

        default:
          break;
      }

      // update categories updateItem.id => category = newCategory
      updateBulletpoint({
        variables: {
          id: updateItemId,
          category: newCategory,
        },
      });
    }
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>
        Aktivitäten{' '}
        <Button
          className={classes.smButton}
          onClick={() => setShowBulletHistoryDialog(true)}>
          <HistoryIcon />
        </Button>
      </h1>
      <div className={classes.bulletList}>
        {loading && <p>Loading ...</p>}
        {!loading && error && <ErrorMessage erorr={error} />}
        {!loading && !error && (
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions.length
                      : 3
                  )}>
                  <h2>
                    {userSettings && userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions[0]
                      : 'Prio 1'}
                  </h2>
                  <Draggable
                    key={'NoMovableOne'}
                    draggableId={'NoMovableOne'}
                    index={999999}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          snapshot.draggingOver
                        )}>
                        <Card className={classes.card}>
                          <CardActions>
                            <Button
                              onClick={() => addNewItem(0)}
                              className={classes.button}>
                              + Neu
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                  {data.myBulletpoints
                    .filter(p => p.category === 0)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        bo={item}>
                        {(provided, snapshot) => (
                          <Bulletpoint
                            bulletObject={item}
                            provided={provided}
                            snapshot={snapshot}
                            onDeleted={() => {
                              refetch();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions.length
                      : 3
                  )}>
                  <h2>
                    {userSettings && userSettings.boardPrioCaptions.length > 1
                      ? userSettings.boardPrioCaptions[1]
                      : 'Prio 2'}
                  </h2>
                  <Draggable
                    key={'NoMovableTwo'}
                    draggableId={'NoMovableTwo'}
                    index={999999}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          snapshot.draggingOver
                        )}>
                        <Card className={classes.card}>
                          <CardActions>
                            <Button
                              onClick={() => addNewItem(1)}
                              className={classes.button}>
                              + Neu
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                  {data.myBulletpoints
                    .filter(p => p.category === 1)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        bo={item}>
                        {(provided, snapshot) => (
                          <Bulletpoint
                            bulletObject={item}
                            provided={provided}
                            snapshot={snapshot}
                            onDeleted={() => {
                              refetch();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable3">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions.length
                      : 3
                  )}>
                  <h2>
                    {userSettings && userSettings.boardPrioCaptions.length > 2
                      ? userSettings.boardPrioCaptions[2]
                      : 'Erledigt'}
                  </h2>
                  <Draggable
                    key={'NoMovableDone'}
                    draggableId={'NoMovableDone'}
                    index={999999}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          snapshot.draggingOver
                        )}>
                        <Card className={classes.card}>
                          <CardActions>
                            <Button
                              onClick={() => addNewItem(2)}
                              className={classes.button}>
                              + Neu
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                  {data.myBulletpoints
                    .filter(p => p.category === 2)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        bo={item}>
                        {(provided, snapshot) => (
                          <Bulletpoint
                            bulletObject={item}
                            provided={provided}
                            snapshot={snapshot}
                            onDeleted={() => {
                              refetch();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable4">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions.length
                      : 3
                  )}>
                  <h2>
                    {userSettings && userSettings.boardPrioCaptions.length > 3
                      ? userSettings.boardPrioCaptions[3]
                      : 'Extra 1'}
                  </h2>
                  <Draggable
                    key={'NoMovableExtra1'}
                    draggableId={'NoMovableExtra1'}
                    index={999999}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          snapshot.draggingOver
                        )}>
                        <Card className={classes.card}>
                          <CardActions>
                            <Button
                              onClick={() => addNewItem(3)}
                              className={classes.button}>
                              + Neu
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                  {data.myBulletpoints
                    .filter(p => p.category === 3)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        bo={item}>
                        {(provided, snapshot) => (
                          <Bulletpoint
                            bulletObject={item}
                            provided={provided}
                            snapshot={snapshot}
                            onDeleted={() => {
                              refetch();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable5">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    userSettings.boardPrioCaptions.length > 0
                      ? userSettings.boardPrioCaptions.length
                      : 3
                  )}>
                  <h2>
                    {userSettings && userSettings.boardPrioCaptions.length > 4
                      ? userSettings.boardPrioCaptions[4]
                      : 'Extra 2'}
                  </h2>
                  <Draggable
                    key={'NoMovableExtra2'}
                    draggableId={'NoMovableExtra2'}
                    index={999999}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          snapshot.draggingOver
                        )}>
                        <Card className={classes.card}>
                          <CardActions>
                            <Button
                              onClick={() => addNewItem(4)}
                              className={classes.button}>
                              + Neu
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                  {data.myBulletpoints
                    .filter(p => p.category === 4)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        bo={item}>
                        {(provided, snapshot) => (
                          <Bulletpoint
                            bulletObject={item}
                            provided={provided}
                            snapshot={snapshot}
                            onDeleted={() => {
                              refetch();
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewBulletpointDialog
              onClose={() => onCloseNewItemDialog()}
              showNewDialog={showNewDialog}
              itemCategory={newItemPrio}
              onCloseCreate={() => {
                onCloseCreate();
                refetch();
              }}
            />
          </DragDropContext>
        )}
      </div>
      <BulletHistoryListDialog
        fullScreen={false}
        open={showBulletHistoryDialog}
        handleClose={() => setShowBulletHistoryDialog(false)}
      />
    </div>
  );
};

export default Bulletpoints;

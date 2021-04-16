/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/TodoPage/reducer';
import saga from 'containers/TodoPage/saga';

import {
  deleteTask,
  updateTaskById,
  updateTask,
} from '../../containers/TodoPage/actions';

import Ul from './Ul';
import Wrapper from './Wrapper';

// @MATERIAL UI
import ListM from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.transparent
  },
  marked: {
    textDecoration: "line-through"
  }
}));

function List(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [text, setText] = React.useState('');
  const [id, setId] = React.useState('');

  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleOpenEdit = (textInput, idTask) => {
    setText(textInput);
    setId(idTask);
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleOpenDel = (textInput, idTask) => {
    setText(textInput);
    setId(idTask);
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleDeleteTaskById = () => {
    props.onChangeSelectedTask(id);
    setOpenDel(false);
  };

  const handleChangeUpdateTask = e => {
    props.onChangeInputTask({ idTask: id, taskValue: e.target.value });
  };

  const handleUpdateTask = () => {
    setOpen(false);
    props.submitUpdateTask();
  };


  let content = <div />;

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      <ListM key={item._id} className={classes.root}>
        <ListItem>
          {/* <IconButton color="primary">
            <CropFreeIcon />
            <LibraryAddCheckIcon />
          </IconButton> */}
          <IconButton onClick={() => handleOpenEdit(item.description, item._id)}>
            <EditIcon />
          </IconButton>
          <ListItemText>{item.description}{' '}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleOpenDel(item.description, item._id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </ListM>
    ));
  } else {
    // Otherwise render a single component
    content = <div />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>

      {/* Edit */}
      <Dialog
        fullWidth
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">EDIT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="Todo"
            fullWidth
            defaultValue={text}
            onChange={handleChangeUpdateTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateTask}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete */}
      <Dialog
        fullWidth
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">DELETE</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{text}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteTaskById}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

List.propTypes = {
  items: PropTypes.array,
  onChangeSelectedTask: PropTypes.func,
  onChangeInputTask: PropTypes.func,
  submitUpdateTask: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
  return {
    onChangeSelectedTask: evt => {
      dispatch(deleteTask(evt));
    },
    onChangeInputTask: evt => dispatch(updateTaskById(evt)),
    submitUpdateTask: () => dispatch(updateTask()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(List);

import React from 'react';

// MATERIAL UI
import ListM from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.transparent,
  },
}));

function ListTodo2({ todo, onEditTask, onDeleteTask, setTaskInput}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpenEdit = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  return (
    <>
      <ListM key={todo._id} className={classes.root}>
        <ListItem>
          <IconButton
            onClick={e => handleOpenEdit(e, todo._id, todo.description)}
          >
            <EditIcon />
          </IconButton>
          <ListItemText>{todo.description}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={e => onDeleteTask(e, todo._id, todo.description)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </ListM>

      {/* EDIT */}
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
            defaultValue={todo.description}
            onChange={e => setTaskInput(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button
            onClick={e => onEditTask(e, todo._id)}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ListTodo2;

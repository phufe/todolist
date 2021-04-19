/*
 * TodoReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_TODO,
  CREATE_TASK,
  LOAD_DATA,
  LOADING_TASK,
  LOAD_DATA_ERROR,
  DELETE_TASK,
  UPDATE_TASK_BY_ID,
  UPDATE_TASK,
} from './constants';

// The initial state of the App
export const initialState = {
  todoList: '',
  todoArray: [],
  loading: false,
  error: false,
  idSelected: null,
  editTaskName: '',
  idEdit: null,
  errorInput: false,
};

/* eslint-disable default-case, no-param-reassign */
const TodoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TODO:
        draft.todoList = action.payload;
        if (action.payload === '') {
          draft.errorInput = true;
        } else {
          draft.errorInput = false;
        }
        break;
      case CREATE_TASK:
        draft.loading = true;
        draft.error = false;
        console.log('run reducer createTask', state)
        break;
      case LOADING_TASK:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_DATA:
        draft.loading = false;
        draft.todoArray = action.payload;
        break;
      case LOAD_DATA_ERROR:
        draft.error = action.payload;
        draft.loading = false;
        break;
      case DELETE_TASK:
        draft.loading = true;
        draft.idSelected = action.payload;
        break;
      case UPDATE_TASK_BY_ID:
        draft.idEdit = action.payload.idTask;
        draft.editTaskName = action.payload.taskValue;
        break;
      case UPDATE_TASK:
        draft.loading = true;
        draft.error = false;
    }
  });

export default TodoPageReducer;

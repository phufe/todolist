/*
 * Todo Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_TODO,
  CREATE_TASK,
  LOAD_DATA_ERROR,
  LOAD_DATA,
  LOADING_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_BY_ID,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_TODO
 */
export function changeInputTodo(payload) {
  return {
    type: CHANGE_TODO,
    payload,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function createTask() {
  return {
    type: CREATE_TASK,
  };
}

export function loadingTask() {
  return {
    type: LOADING_TASK,
  };
}

export function loadData(payload) {
  return {
    type: LOAD_DATA,
    payload,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function loadDataError(payload) {
  return {
    type: LOAD_DATA_ERROR,
    payload,
  };
}

export function deleteTask(payload) {
  return {
    type: DELETE_TASK,
    payload,
  };
}

export function updateTaskById(payload) {
  return {
    type: UPDATE_TASK_BY_ID,
    payload,
  };
}

export function updateTask() {
  return {
    type: UPDATE_TASK,
  };
}

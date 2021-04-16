/**
 * TodoPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodoPage = state => state.todoListReducer || initialState;

const makeSelectTodoPage = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.todoList,
  );
const makeSelectData = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.todoArray,
  );

const makeSelectLoading = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.error,
  );

const makeSelectGetTaskById = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.idSelected,
  );

const makeSelectTaskIdEdit = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.idEdit,
  );

const makeSelectTaskEdit = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.editTaskName,
  );

const makeSelectTaskErrorInput = () =>
  createSelector(
    selectTodoPage,
    todoListReducer => todoListReducer.errorInput,
  );

export {
  selectTodoPage,
  makeSelectTodoPage,
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetTaskById,
  makeSelectTaskIdEdit,
  makeSelectTaskErrorInput,
  makeSelectTaskEdit,
};

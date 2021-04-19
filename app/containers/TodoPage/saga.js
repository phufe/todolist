/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  CREATE_TASK,
  LOADING_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from 'containers/TodoPage/constants';
import { loadDataError, loadData } from 'containers/TodoPage/actions';
import services from './services';

import {
  makeSelectTodoPage,
  makeSelectGetTaskById,
  makeSelectTaskIdEdit,
  makeSelectTaskEdit,
} from './selectors';
/**
 * Root saga manages watcher lifecycle
 */
export default function* TodoData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOADING_TASK, loadDataTask);
  yield takeLatest(CREATE_TASK, createTask);
  yield takeLatest(DELETE_TASK, deleteTaskById);
  yield takeLatest(UPDATE_TASK, updateTaskById);
}
/**
 * Github repos request/response handler
 */
export function* createTask() {
  const todoList = yield select(makeSelectTodoPage());
  console.log('run saga createTask')
  try {
    yield call(services.addList, todoList);
    yield call(loadDataTask);
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* loadDataTask() {
  try {
    const requestURL = yield call(services.getList);
    yield put(loadData(requestURL.data.data));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export function* deleteTaskById() {
  const idTask = yield select(makeSelectGetTaskById());
  console.log('saga delete')
  try {
    yield call(services.deleteList, idTask);
    yield call(loadDataTask);
  } catch (err) {
    console.log(err);
    yield put(loadDataError(err));
  }
}

export function* updateTaskById() {
  const idTaskEdit = yield select(makeSelectTaskIdEdit());
  const taskDes = yield select(makeSelectTaskEdit());
  // console.log('run saga');
  try {
    yield call(services.updateList, idTaskEdit, taskDes);
    yield call(loadDataTask);
  } catch (err) {
    console.log(err);
    yield put(loadDataError(err));
  }
}

/*
 * TodoConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_TODO = 'boilerplate/Todo/CHANGE_TODO';

export const CREATE_TASK = 'boilerplate/Todo/CREATE_TASK';

export const LOAD_DATA_ERROR = 'boilerplate/Todo/LOAD_DATA_ERROR';

export const LOAD_DATA = 'boilerplate/Todo/LOAD_DATA';

export const LOADING_TASK = 'boilerplate/Todo/LOADING_TASK';

export const DELETE_TASK = 'boilerplate/Todo/DELETE_TASK';

export const UPDATE_TASK_BY_ID = 'boilerplate/Todo/UPDATE_TASK_BY_ID';

export const UPDATE_TASK = 'boilerplate/Todo/UPDATE_TASK';

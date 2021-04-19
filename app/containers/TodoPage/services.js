import { excute } from '../../utils/requestAxios';

const API = {
  getList: () => excute('GET', 'task').then(res => res),
  addList: todoList =>
    excute('POST', 'task', {
      description: todoList,
    }).then(res => res),
  deleteList: idTask => excute('DELETE', `task/${idTask}`).then(res => res),
  updateList: (idTask, infoTask) =>
    excute('PUT', `task/${idTask}`, {
      description: infoTask,
    }).then(res => res),
};
export default API;

import { ITask } from "../../interfaces/ITask";
const inititalState: ITask[] = [
  {
    key: '1',
    title: 'title test',
    description: 'description test',
    completed: false,
  },
  {
    key: '2',
    title: 'title test 2',
    description: 'description test 2',
    completed: true,
  },
  {
    key: '3',
    title: 'title test 3',
    description: 'description test 3',
    completed: false,
  },
];
const taskReducer = (state: ITask[] = inititalState, action) => {
  switch (action.type) {
    case "addTask": {
      return [...state, action.payload];
    }
    case "updateTasks": {
      return action.payload;
    }
  }
  return state;
};
export default taskReducer;
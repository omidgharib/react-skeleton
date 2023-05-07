export const addTask = (tasks) => {
  return {
    type: "addTask",
    payload: tasks,
  };
};
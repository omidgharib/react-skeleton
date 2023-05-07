export const updateTasks = (tasks) => {
  return {
    type: "updateTasks",
    payload: tasks,
  };
};
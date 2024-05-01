export const addTaskSheet = (taskSheets) => {
    return {
        type: 'addTaskSheet',
        payload: taskSheets,
    }
}

export const updateTaskSheet = (taskSheets) => {
    return {
        type: 'updateTaskSheet',
        payload: taskSheets,
    }
}

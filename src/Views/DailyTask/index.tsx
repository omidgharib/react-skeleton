import '@/components/datePicker/Calendar.css'
import TaskList from '@/components/task/List'
import Task from '@/components/task/Create'

const DailyTask = () => {
  return (
    <>
      Daily Task
      <Task />
      <TaskList />
    </>
  )
}

export default DailyTask

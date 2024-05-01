import { useEffect, useState, useRef } from 'react'
import '@/components/datePicker/Calendar.css'
import TaskList from '@/components/task/List'
import Task from '@/components/task/Create'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const DailyTask = () => {
    const [value, onChange] = useState<Value>(new Date())

    return (
        <>
            Daily Task
            <Task />
            <TaskList />
        </>
    )
}

export default DailyTask

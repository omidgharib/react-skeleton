import { useEffect, useState, useRef } from 'react'
import {
    Button,
    Input,
    Space,
    // Table,
    Checkbox,
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/redux/stores/store'
import type { InputRef } from 'antd'
import type { CheckboxProps, TagProps } from 'antd'
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { updateTasks } from '../../redux/actions/updateTasks'
import { updateTaskSheet, addTaskSheet } from '../../redux/actions/taskSheet'
import { ITask } from '../../interfaces/ITask'
import { ITaskMonthSheet } from '../../interfaces/ITaskMonthSheet'
import Table from './Table'
import EditModal from './EditModal'
// import TaskForm from "./Form";

type DataIndex = keyof ITask
const Tasks = () => {
    const tasksData = useSelector((state: ITask[]) => {
        return state
    })
    const taskSheetData = useSelector((state: ITaskMonthSheet[]) => {
        return state
    })
    const dispatch = useDispatch()
    const tasks = tasksData?.task
    const taskSheet = taskSheetData?.taskSheet
    console.log('tasksData', tasksData)

    // const [tasks, setTasks] = useState(tasksData?.tasks);
    // const [taskSheet, setTaskSheet] = useState(taskSheetData?.taskSheet);
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [editTaskData, setEditTaskData] = useState<ITask>()
    const searchInput = useRef<InputRef>(null)

    useEffect(() => {
        console.log('tasks xxx', tasks)
        // setTasks(tasksData?.tasks);
        // update and init tasks
        initTaskSheet(tasks)
    }, [tasks])

    const initTaskSheet = (tasks: ITask[]) => {
        // add to component utils
        const res = []
        for (let i = 0; i < tasks.length; i++) {
            const element = tasks[i]
            const findedTask = findTask(element)
            if (!findedTask) {
                // init
                res.push({
                    task: element,
                    days: generateDays(),
                })
            } else {
                // update
                res.push({
                    ...findedTask,
                    task: element,
                })
            }
        }
        console.log('initTaskSheet', res)
        // setTaskSheet(res);  // need to be cleared
        dispatch(updateTaskSheet(res))
    }

    const findTask = (element: ITask) => {
        // add to component utils
        // const taskSheet = taskSheetData?.taskSheet;
        console.log('xxx', taskSheet)
        return (
            taskSheet?.length > 0 &&
            taskSheet.find((x) => x.task.key === element.key)
        )
    }

    const generateDays = () => {
        // add to component utils
        // need to be update with dates
        return new Array(31).fill(0).map((e, i) => {
            return {
                date: i,
                checked: null,
            }
        })
    }

    const calcTotalRow = (record) => {
        // add to component utils
        console.log('record', record)
        let total = 0
        for (const key in record) {
            if (record.hasOwnProperty.call(record, key)) {
                const element = record[key]
                if (key.includes('date') && element.checked) {
                    total++
                }
            }
        }
        return total
    }

    const covertToTableFormat = (data) => {
        // add to component utils
        const result = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i]
            const obj = {
                ...element.task,
            }
            for (let j = 0; j < element.days.length; j++) {
                const day = element.days[j]
                obj[`date_${day.date}`] = { ...day }
            }
            result.push(obj)
        }
        return result
    }

    const changeStatus = (record: ITask) => {
        const newData = [...tasks]
        newData.find((item) => item.key === record?.key).completed =
            !record?.completed
        dispatch(updateTasks(newData))
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const onChange: CheckboxProps['onChange'] = (e) => {
        const [key, day] = e.target?.name.split('_')
        const newTaskSheetClone = structuredClone(taskSheet)
        const item = newTaskSheetClone.find((x) => x.task.key === key)
        item.days[day].checked = e.target.checked
        dispatch(updateTaskSheet(newTaskSheetClone))
    }

    const deleteRecord = (record) => {
        let newTaskSheetClone = structuredClone(taskSheet)
        newTaskSheetClone = newTaskSheetClone.filter(function (obj) {
            return obj.task.key !== record?.key
        })
        dispatch(updateTaskSheet(newTaskSheetClone))
    }

    const editRecord = (record) => {
        const task = tasks.find((x) => x.key === record?.key)
        console.log('editRecord', record, task)
        setEditTaskData(task)
    }

    const onCloseEditModal = () => {
        setEditTaskData(null)
    }

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ITask> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })

    const columns: ColumnsType<ITask> = [
        {
            title: 'شرح',
            dataIndex: 'title',
            ...getColumnSearchProps('title'),
            fixed: 'left',
            width: 150,
        },
        {
            title: 'نوع',
            dataIndex: 'type',
            width: 100,
        },
    ]

    for (let i = 0; i < 31; i++) {
        columns.push({
            title: i + 1,
            dataIndex: `date_${i}`,
            render: (_, record) => (
                <Space size='middle'>
                    {/* <a>Invite {record.name}</a> */}
                    <Checkbox
                        // id={i.toString()}
                        name={record.key + '_' + i.toString()}
                        onChange={onChange}
                    ></Checkbox>
                </Space>
            ),
        })
    }

    columns.push({
        title: 'هدف',
        dataIndex: 'target',
        fixed: 'right',
        width: 80,
    })

    columns.push({
        title: 'جمع',
        dataIndex: 'total',
        fixed: 'right',
        width: 80,
        render: (_, record) => (
            <Space size='middle'>{calcTotalRow(record)}</Space>
        ),
    })

    columns.push({
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size='middle'>
                <a onClick={() => editRecord(record)}>Edit</a>
                <a onClick={() => deleteRecord(record)}>Delete</a>
            </Space>
        ),
        fixed: 'right',
    })

    return (
        <>
            {editTaskData ? (
                <EditModal onClose={onCloseEditModal} data={editTaskData} />
            ) : null}
            <Table
                // bordered={true}
                columns={columns}
                data={covertToTableFormat(taskSheet)}
            />
        </>
    )
}

export default Tasks

import { useEffect, useState, useRef } from 'react'
import { Button, Input, Space, Checkbox } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { InputRef } from 'antd'
import type { CheckboxProps } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { updateTaskSheet } from '../../redux/actions/taskSheet'
import { TTask, TTaskMonthSheet } from '../../types/task'
import Table from './Table'
import EditModal from './EditModal'
import { RootState } from '@/redux/stores/store'
import taskApi from '@/services/taskApi'

type DataIndex = keyof TTask
const Tasks = () => {
  const dispatch = useDispatch()
  const { data: tasks } = taskApi.useGetTasksQuery()
  // const tasks: TTask[] = useSelector((state: RootState) => state.task)
  const taskSheet: TTaskMonthSheet[] = useSelector(
    (state: RootState) => state.taskSheet
  )
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [editTaskData, setEditTaskData] = useState<TTask>()
  const searchInput = useRef<InputRef>(null)

  useEffect(() => {
    // setTasks(tasksData?.tasks);
    // update and init tasks
    tasks && initTaskSheet(tasks)
  }, [tasks])

  const initTaskSheet = (tasks: TTask[]) => {
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
    // setTaskSheet(res);  // need to be cleared
    dispatch(updateTaskSheet(res))
  }

  const findTask = (element: TTask) => {
    // add to component utils
    // const taskSheet = taskSheetData?.taskSheet;
    return (
      taskSheet?.length > 0 && taskSheet.find((x) => x.task.id === element.id)
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

  // const changeStatus = (record: TTask) => {
  //     const newData = [...tasks]
  //     newData.find((item) => item.key === record?.key).completed =
  //         !record?.completed
  //     dispatch(updateTasks(newData))
  // }

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
    if (e.target?.name) {
      const [id, day] = e.target.name.split('_')
      const newTaskSheetClone = structuredClone(taskSheet)
      const item = newTaskSheetClone.find((x) => +x.task.id === +id)
      console.log('aaa', item, day, newTaskSheetClone, taskSheet, id)
      item.days[day].checked = e.target.checked
      console.log('xxx', newTaskSheetClone)
      dispatch(updateTaskSheet(newTaskSheetClone))
    }
  }

  const deleteRecord = (record) => {
    let newTaskSheetClone = structuredClone(taskSheet)
    newTaskSheetClone = newTaskSheetClone.filter(function (obj) {
      return obj.task.id !== record?.id
    })
    dispatch(updateTaskSheet(newTaskSheetClone))
  }

  const editRecord = (record) => {
    const task = tasks.find((x) => x.id === record?.id)
    console.log('editRecord', record, task)
    setEditTaskData(task)
  }

  const onCloseEditModal = () => {
    setEditTaskData(null)
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<TTask> => ({
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
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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

  const columns: ColumnsType<TTask> = [
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
            name={record.id + '_' + i.toString()}
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
    render: (_, record) => <Space size='middle'>{calcTotalRow(record)}</Space>,
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

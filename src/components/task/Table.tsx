import { useEffect, useState, useRef } from 'react'
import { Button, Input, Space, Table, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { InputRef } from 'antd'
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { updateTasks } from '../../redux/actions/updateTasks'
import { ITask } from '../../interfaces/ITask'
// import TaskForm from "./Form";
const { Text } = Typography
type DataIndex = keyof ITask
type TileProps = {
    columns: any
    data: ITask[]
}
const TableTasks = (props: TileProps) => {
    const { columns, data } = props
    const tasksData = useSelector((state: ITask[]) => {
        return state
    })
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState(tasksData)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const calcColumnChecked = (key: string) => {
        // add to utils
        let count = 0
        data.forEach((item) => {
            item[key]?.checked && count++
        })
        return count
    }

    const calcColumn = (key: string) => {
        // add to utils
        let count = 0
        data.forEach((item) => {
            count += +item?.[key] || 0
        })
        return count
    }

    return (
        <>
            <Table
                dataSource={data}
                columns={columns}
                scroll={{ x: 2800, y: '100%' }}
                virtual
                summary={(pageData) => {
                    let total = 0

                    return (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>
                                    <Text>مجموع</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                    index={1}
                                ></Table.Summary.Cell>
                                {columns.map((item, index) => {
                                    const { dataIndex } = item
                                    let columnTotal = 0
                                    if (dataIndex?.includes('date')) {
                                        // const key = dataIndex.split("_")?.[1];
                                        columnTotal =
                                            calcColumnChecked(dataIndex)
                                        total += columnTotal
                                        return (
                                            <Table.Summary.Cell
                                                index={index + 2}
                                            >
                                                {columnTotal}
                                            </Table.Summary.Cell>
                                        )
                                    } else if (dataIndex.includes('target')) {
                                        return (
                                            <Table.Summary.Cell
                                                index={columns.length - 3}
                                            >
                                                {calcColumn('target')}
                                            </Table.Summary.Cell>
                                        )
                                    } else if (dataIndex.includes('total')) {
                                        return (
                                            <Table.Summary.Cell
                                                index={columns.length - 2}
                                            >
                                                {total}
                                            </Table.Summary.Cell>
                                        )
                                    }
                                })}
                                <Table.Summary.Cell
                                    index={columns.length - 1}
                                ></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )
                }}
            />
        </>
    )
}

export default TableTasks

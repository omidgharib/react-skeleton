import type { CALENDAR_TYPES, DEPRECATED_CALENDAR_TYPES } from '../constants'
export type Range<T> = [T, T]

export type Action =
    | 'prev'
    | 'prev2'
    | 'next'
    | 'next2'
    | 'onChange'
    | 'drillUp'
    | 'drillDown'

export type ClassName =
    | string
    | null
    | undefined
    | (string | null | undefined)[]

export type CalendarType = (typeof CALENDAR_TYPES)[keyof typeof CALENDAR_TYPES]

export type DeprecatedCalendarType =
    (typeof DEPRECATED_CALENDAR_TYPES)[keyof typeof DEPRECATED_CALENDAR_TYPES]

export type CloseReason = 'buttonClick' | 'escape' | 'outsideAction' | 'select'

export type RangeType = 'century' | 'decade' | 'year' | 'month' | 'day'

export type Detail = 'century' | 'decade' | 'year' | 'month'

export type LooseValuePiece = string | Date | null

export type LooseValue = LooseValuePiece | Range<LooseValuePiece>

type ValuePiece = Date | null

export type View = 'century' | 'decade' | 'year' | 'month'

export type Value = ValuePiece | Range<ValuePiece>

export type OnClickFunc = (
    value: Date,
    event: React.MouseEvent<HTMLButtonElement>
) => void

export type OnClickWeekNumberFunc = (
    weekNumber: number,
    date: Date,
    event: React.MouseEvent<HTMLButtonElement>
) => void

export type TileArgs = {
    activeStartDate: Date
    date: Date
    view: View
}

export type TileClassNameFunc = (args: TileArgs) => ClassName

export type TileContentFunc = (args: TileArgs) => React.ReactNode

export type TileDisabledFunc = (args: TileArgs) => boolean

export type NavigationLabelArgs = {
    date: Date
    label: string
    locale: string | undefined
    view: View
}

export type NavigationLabelFunc = ({
    date,
    label,
    locale,
    view,
}: NavigationLabelArgs) => React.ReactNode

export type OnArgs = {
    action: Action
    activeStartDate: Date | null
    value: Value
    view: View
}
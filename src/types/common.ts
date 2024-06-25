export interface IListApiResponse<RecordType> {
  count: number
  next: string
  previous: string
  results: RecordType[]
}
export interface IListQueryResponse<RecordType> {
  dataSource: RecordType[]
  totalRecords: number
}

export interface ILoginInfo {
  username: string
  password: string
  country_code: string
}
export interface ILoginResponse {
  refresh_token: string
  access_token: string
}
export interface IChoice {
  label: string
  value: string
}
export interface IFieldExtra {
  choices?: IChoice[]
  serviceUrl?: string
}
export type FieldWidgetType =
  | 'text'
  | 'select'
  | 'foreignkey'
  | 'number'
  | 'checkbox'
  | 'email'
  | 'url'
  | 'datetime'
export interface IField {
  widget: FieldWidgetType
  required: boolean
  label: string
  name: string
  extra: IFieldExtra
}
export interface IListOptionsResponse {
  fields: IField[]
}

export interface ISelectListResponse {
  count: number
  results: IChoice[]
}
export interface IColumn {
  title: string
  dataIndex: string | string[]
}
export type FormInputValueType = string | number | string[] | number[]
export interface IMenuItem {
  label: string
  key: string
  icon: JSX.Element
  danger?: boolean
}
export type SearchObject = { [key: string]: FormInputValueType }

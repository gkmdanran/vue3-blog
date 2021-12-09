import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
interface BaseTableProps<T> extends  Omit<TableProps<any>, 'data'> {
   data?:[T]
}
export interface ITable<T=any> {
    pagination?:any
    columns:any[]
}

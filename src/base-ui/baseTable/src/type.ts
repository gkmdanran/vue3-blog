import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
interface BaseTableProps<T> extends Omit<TableProps<any>, 'data'> {
    data?: [T]
}
interface IPaginationAttributes {
    small?: boolean
    background?: boolean;
    defaultPageSize?: number;
    pagerCount?: number;
    defaultCurrentPage?: number;
    layout?: string;
    pageSizes?: number[];
    popperClass?: string;
    prevText?: string;
    nextText?: string;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
}
export interface ITable {
    title?:string
    columns: any[],
    paginationAttributes?: IPaginationAttributes
}
export interface IPagination {
    page: number,
    size: number,
    total: number
}
import { ITagItem } from '../Tag/type'
export interface IArticleItem {
    id: string,
    title: string,
    tag: ITagItem[],
    description: string,
    star: number,
    createAt: string,
    isHide:number,
    isTop:number
}
export interface ISearchForm {
    title: string
    tag: number
}

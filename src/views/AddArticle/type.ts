import { ITagItem } from "@/views/Tag/type";
export interface IArticleForm {
    link: string,
    title: string,
    tagList: ITagItem[],
    description: string,
    mdValue: string,
}
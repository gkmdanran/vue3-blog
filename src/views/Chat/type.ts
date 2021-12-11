export interface IChatItem {
    _id: string,
    chatName: string,
    chatContent: string,
    chatWay: string,
    createTime: string,
    __v: number
}
export interface ISearchForm {
    queryPeople: string 
    queryDate: any
}

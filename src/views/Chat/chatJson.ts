export const tableJson = {
    title: '留言列表',
    columns: [
        {
            type: 'selection',
            width: 50
        },
        {
            label: '留言人',
            prop: "chatName",
        },
        {
            label: "内容",
            prop: "chatContent",
        },
        {
            label: "联系方式",
            prop: "chatWay",
            slotName: "chatWay"
        },
        {
            label: "发言时间",
            prop: "createAt",
            slotName: "createAt"
        },
    ],

}
export const searchJson = {
    searchItems: {
        queryPeople: {
            label: "留言人",
            type: "input",
        },
        queryDate: {
            label: "留言时间",
            type: "date",
        }
    }
}
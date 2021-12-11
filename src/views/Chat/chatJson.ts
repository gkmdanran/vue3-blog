export const tableJson = {
    title:'留言列表',
    columns: [
        {
            type:'selection',
            width:50
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
            label:"联系方式",
            prop:"chatWay",
            slotName:"chatWay"
        },
        {
            label:"发言时间",
            prop:"createTime",
            slotName:"createTime"
        },
    ],

}
export const searchJson = {
    formAttributes: {
        labelWidth: "70px",
    },
    formItems: [
        {
            prop: "queryPeople",
            label: "留言人",
            type: "input",
        },
        {
            prop: "queryDate",
            label: "留言时间",
            type: "date",
        },
    ],
}
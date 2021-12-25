export const tableJson = {
    title: '音乐列表',
    columns: [

        {
            label: '歌名',
            prop: "title",
            showOverflowTooltip: true
        },
        {
            label: "歌手",
            prop: "artist",
            showOverflowTooltip: true,
        },
        {
            label: "网易云ID",
            prop: "cloudID",
            width: 150
        },
        {
            label: "歌词",
            prop: "lrc",
            width: 80,
            slotName: 'lrc'
        },
        {
            label: '操作',
            slotName: 'handler',
            width: 120
        }
    ],

}

export const addDialogJson = {
    formAttributes: {
        labelWidth: "80px",
        rules: {
            title: [
                {
                    required: true,
                    message: "请输入相册名",
                    trigger: "blur",
                },
            ],
        },
    },
    formItems: {
        title: {
            type: "input",
            label: "相册名",
            attrs: {
                maxlength: 50
            }
        },
        tag: {
            type: "input",
            label: "标签",
            attrs: {
                maxlength: 2
            }
        },

    },
};
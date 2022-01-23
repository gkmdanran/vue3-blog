export const editDialogJson = {
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
            password: [
                {
                    pattern: /^[a-zA-z0-9]{4,10}$/,
                    message: "请输入4-10位的英文或数字",
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
        password: {
            type: "input",
            label: "密码",
            attrs: {
                type: 'password',
                showPassword: true
            }
        }
    },
};
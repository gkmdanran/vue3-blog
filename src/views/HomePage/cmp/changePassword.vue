<template>
  <base-dialog-form
    title="修改密码"
    width="400px"
    v-model:dialogForm="passwordForm"
    :modelValue="visible"
    @update:modelValue="$emit('update:visible', false)"
    :form-json="dialogJson"
    @success="submitForm"
  ></base-dialog-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { IPasswordForm } from "./type";
import { changePassword } from "@/http/login";
import { ElMessage } from "element-plus";
import { useRouter, Router } from "vue-router";
import Cookies from "js-cookie";
export default defineComponent({
  name: "changePassword",
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:visible", "success"],
  setup() {
    const dialogJson = {
      formAttributes: {
        labelWidth: "100px",
        rules: {
          oldPassword: [
            {
              required: true,
              message: "请输入旧密码",
              trigger: "blur",
            },
          ],
          newPassword: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur",
            },
            {
              pattern: /^[a-zA-z0-9]{6,18}$/,
              message: "请输入6-18位的英文或数字",
              trigger: "blur",
            },
          ],
          confirmPassword: [
            {
              required: true,
              message: "请确认新密码",
              trigger: "blur",
            },
            { validator: confirm, trigger: "blur" },
          ],
        },
      },
      formItems: {
        oldPassword: {
          type: "input",
          label: "旧密码",
          attrs: {
            type: "password",
          },
        },
        newPassword: {
          type: "input",
          label: "新密码",
          attrs: {
            type: "password",
          },
        },
        confirmPassword: {
          type: "input",
          label: "确认密码",
          attrs: {
            type: "password",
            placeholder: "请确认密码",
          },
        },
      },
    };
    const router: Router = useRouter();
    let passwordForm = reactive<IPasswordForm>({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    function confirm(rule: any, value: string, callback: Function) {
      if (value != passwordForm.newPassword) {
        callback(new Error("两次密码需要一致"));
      } else {
        callback();
      }
    }
    function submitForm(form: IPasswordForm) {
      changePassword(form.oldPassword, form.newPassword).then((res) => {
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "修改成功，请重新登录！",
          });
          Cookies.set("blog_token", "");
          router.push("/");
        }
      });
    }
    return {
      dialogJson,
      passwordForm,
      submitForm,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

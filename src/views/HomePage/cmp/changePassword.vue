<template>
  <base-dialog-form
    v-model:dialogForm="searchForm"
    @close="$emit('update:visible', false)"
    v-model="visible"
    :form-json="dialogJson"
  ></base-dialog-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "changePassword",
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    const dialogJson = {
      formAttributes: {
        labelWidth: "100px",
        rules: {
          oldPassword: [
            {
              required: true,
              message: "请输入旧密码",
            },
          ],
          newPassword: [
            {
              required: true,
              message: "请输入旧密码",
            },
          ],
          confirmPassword: [
            {
              required: true,
              message: "请输入旧密码",
            },
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
          },
        },
      },
    };
    let searchForm = reactive<any>({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    return {
      dialogJson,
      searchForm,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

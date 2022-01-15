<template>
  <div>
    <div class="add-photo" @click="visible = true">
      <div class="addtxt">
        <i class="el-icon-picture-outline"></i>
        <p>新建相册</p>
      </div>
    </div>
    <base-dialog-form
      title="创建相册"
      width="400px"
      v-model:dialogForm="addForm"
      v-model="visible"
      :form-json="addDialogJson"
      @success="submitForm"
    ></base-dialog-form>
  </div>
</template>
<script lang="ts">
import { addDialogJson } from "../photoJson";
import { addPhoto } from "@/http/photo";
import { IPhotoForm } from "../type";
import { defineComponent, ref, reactive, PropType } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "AddPhoto",
  props: {},
  components: {},
  setup(props, { emit }) {
    const addForm = reactive<IPhotoForm>({
      title: "",
      tag: "",
    });
    const visible = ref<boolean>(false);
    function submitForm() {
      addPhoto(addForm).then((res) => {
        if (res.code == 200) {
          ElMessage({ type: "success", message: "创建成功" });
          visible.value = false;
        }
      });
    }

    return {
      visible,
      addForm,
      addDialogJson,
      submitForm,
    };
  },
});
</script>
<style lang="less" scoped>
.add-photo {
  cursor: pointer;
  margin: 15px;
  position: relative;
  width: 180px;
  padding: 6px;
  height: 210px;
  background-color: #fefff7;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.2);
  .addtxt {
    font-size: 18px;
    color: #cccccc;
    display: flex;
    height: 90%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      letter-spacing: 1px;
      margin-top: 10px;
    }
    .el-icon-picture-outline:before {
      font-size: 45px;
    }
  }
}
</style>
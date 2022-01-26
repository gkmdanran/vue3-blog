<template>
  <el-dialog
    :model-value="uploadVisible"
    @close="$emit('update:modelValue', false)"
    title="上传图片"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
  >
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :limit="limit"
      :file-list="fileLists"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :auto-upload="false"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="uploadPic">上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import router from "@/router";
import { ElMessage } from "element-plus";
import { defineComponent, ref, reactive } from "vue";
import { UploadFile } from "element-plus/lib/components/upload/src/upload.type";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { uploadPhoto } from "@/http/photo";
export default defineComponent({
  name: "Upload",
  props: {
    uploadVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "success"],
  components: {},
  setup(props, { emit }) {
    const fileLists = ref<UploadFile[]>([]);
    const limit: number = 9;
    const route: RouteLocationNormalizedLoaded = useRoute();
    function handleClose() {
      fileLists.value = [];
      emit("update:modelValue", false);
    }
    function uploadPic() {
      if (fileLists.value.length == 0)
        return ElMessage({
          type: "warning",
          message: `请选择照片后再上传`,
        });
      let formData = new FormData();
      formData.append("id", String(route.params.id));
      fileLists.value.forEach((file: any) => {
        formData.append("files", file.raw);
      });
      uploadPhoto(formData).then((res) => {
        if (res.code == 200) {
          handleClose()
          emit("success");
        }
      });
    }
    function handleChange(file: UploadFile, fileList: UploadFile[]) {
      fileLists.value = fileList;
    }
    function handleExceed() {
      ElMessage({
        type: "warning",
        message: `照片一次最多只能上传${limit}张`,
      });
    }
    return {
      limit,
      fileLists,
      handleClose,
      uploadPic,
      handleChange,
      handleExceed,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
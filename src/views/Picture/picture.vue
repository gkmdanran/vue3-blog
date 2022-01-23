<template>
  <base-container
    :breadcrumbs="[
      { name: '首页', path: '/home' },
      { name: '相册管理', path: '/photo' },
      { name: title },
    ]"
    class="picture"
  >
    <template #other>
      <div class="btns">
        <el-button type="primary" round size="small" @click="visible = true"
          >设置相册 <i class="el-icon-picture"></i
        ></el-button>
        <el-button type="danger" round size="small"
          >批量管理<i class="el-icon-setting"></i
        ></el-button>
        <el-button type="info" round size="small"
          >设置封面<i class="el-icon-edit"></i
        ></el-button>

        <el-button
          type="success"
          round
          size="small"
          @click="uploadVisible = true"
          >上传图片<i class="el-icon-upload"></i
        ></el-button>
      </div>
      <base-dialog-form
        title="设置相册"
        width="400px"
        v-model:dialogForm="editForm"
        v-model="visible"
        :form-json="editDialogJson"
        @success="submitForm"
      ></base-dialog-form>
      <upload v-model="uploadVisible" />
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { getDetail, editPhoto } from "@/http/photo";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { editDialogJson } from "./pictureJson";
import { IPhotoForm } from "@/views/Photo/type";
import { BASE_URL } from "@/serivce/request/config";
import upload from "./cmp/upload.vue";
import Cookies from "js-cookie";
export default defineComponent({
  name: "Picture",
  components: { upload },
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const title = ref<string>("");
    const editForm = reactive<IPhotoForm>({
      id: "",
      title: "",
      tag: "",
      password: "",
    });
    const visible = ref<boolean>(false);
    const uploadVisible = ref<boolean>(false);
    function getPictureList() {
      getDetail(String(route.params.id)).then((res) => {
        title.value = res.data.title;
        editForm.id = res.data.id;
        editForm.title = res.data.title;
        editForm.tag = res.data.tag;
        editForm.password = res.data.password;
      });
    }
    function submitForm() {
      editPhoto(editForm).then((res) => {
        if (res.code == 200) {
          visible.value = false;
          getPictureList();
        }
      });
    }
    getPictureList();
    let token: string = "Bearer " + (Cookies.get("blog_token") || "");
    return {
      editForm,
      editDialogJson,
      visible,
      uploadVisible,
      title,
      BASE_URL,
      token,
      submitForm,
    };
  },
});
</script>
<style lang="less" scoped>
.picture {
  /deep/.search_area {
    border: none !important;
  }
  .btns {
    display: flex;
  }
}
</style>
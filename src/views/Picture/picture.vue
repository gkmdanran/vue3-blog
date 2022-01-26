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
      <div class="top">
        <div class="btns">
          <el-button type="primary" round size="small" @click="visible = true"
            >设置相册 <i class="el-icon-picture"></i
          ></el-button>
          <el-button type="danger" round size="small" @click="manage"
            >{{ showCheck ? "退出管理" : "批量管理"
            }}<i class="el-icon-setting"></i
          ></el-button>
          <el-button type="info" round size="small" @click="setCover"
            >设置封面<i class="el-icon-edit"></i
          ></el-button>

          <el-button
            type="success"
            round
            size="small"
            @click="uploadVisible = true"
            >上传图片<i class="el-icon-upload"></i
          ></el-button>
          <el-checkbox
            v-show="showCheck"
            v-model="checkAll"
            @change="handleCheckAllChange"
            style="margin-left: 10px; height: 20px"
            >全选图片</el-checkbox
          >
        </div>
        <div class="right">
          <i
            class="el-icon-delete"
            v-show="checkedPics.length > 0"
            @click="delPics"
          ></i>
        </div>
      </div>

      <el-checkbox-group
        v-model="checkedPics"
        @change="handleCheckedPicsChange"
      >
        <div class="pic-content">
          <div class="pic" v-for="item in picList" :key="item.id">
            <el-checkbox :label="item" v-show="showCheck"></el-checkbox>
            <el-image
              style="width: 100%; height: 100%"
              :src="item.url"
              fit="cover"
              :preview-src-list="previewList"
            ></el-image>
          </div>
        </div>
      </el-checkbox-group>
      <div class="footer">
        <el-pagination
          v-model:currentPage="page"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <base-dialog-form
        title="设置相册"
        width="400px"
        v-model:dialogForm="editForm"
        v-model="visible"
        :form-json="editDialogJson"
        @success="submitForm"
      ></base-dialog-form>
      <upload v-model="uploadVisible" @success="getPictureList" />
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { getDetail, editPhoto, delPictures, setPhotoCover } from "@/http/photo";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { editDialogJson } from "./pictureJson";
import { IPhotoForm, IPic } from "@/views/Photo/type";
import { BASE_URL } from "@/serivce/request/config";
import upload from "./cmp/upload.vue";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "Picture",
  components: { upload },
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const total = ref<number>(0);
    const page = ref<number>(1);
    const title = ref<string>("");
    const checkedPics = ref<IPic[]>([]);
    const checkAll = ref<boolean>(false);
    const showCheck = ref<boolean>(false);
    const editForm = reactive<IPhotoForm>({
      id: "",
      title: "",
      tag: "",
      password: "",
    });
    const visible = ref<boolean>(false);
    const uploadVisible = ref<boolean>(false);
    const picList = ref<IPic[]>([
      {
        id: 1,
        url: "https://t7.baidu.com/it/u=1807820346,973783503&fm=218&app=125&f=JPEG?w=121&h=75&s=F1C1F91F8F4C4CCC0E7175DA0300B037",
      },
      {
        id: 2,
        url: "https://t7.baidu.com/it/u=1807820346,973783503&fm=218&app=125&f=JPEG?w=121&h=75&s=F1C1F91F8F4C4CCC0E7175DA0300B037",
      },
    ]);
    const previewList = ref<string[]>([]);
    function getPictureList() {
      getDetail(String(route.params.id), page.value, 20).then((res) => {
        title.value = res.data.title;
        editForm.id = res.data.id;
        editForm.title = res.data.title;
        editForm.tag = res.data.tag;
        editForm.password = res.data.password;
        total.value = res.data.pictures.total;
        picList.value = res.data.pictures.list;
        previewList.value = res.data.pictures.list.map(
          (item: IPic) => item.url
        );
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
    function handleCurrentChange(val: number) {
      page.value = val;
      getPictureList();
    }
    function handleCheckedPicsChange(value: number[]) {
      checkAll.value = value.length === picList.value.length;
    }
    function handleCheckAllChange(val: boolean) {
      checkedPics.value = val ? picList.value : [];
    }
    function manage() {
      showCheck.value = !showCheck.value;
      checkAll.value = false;
      checkedPics.value = [];
    }
    function setCover() {
      if (checkedPics.value.length !== 1)
        return ElMessage({
          type: "warning",
          message: "请选择一张图片",
        });
      setPhotoCover(checkedPics.value[0].url);
    }
    function delPics() {
      ElMessageBox.confirm(
        `确认删除${checkedPics.value.length}张图片吗？`,
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids: number[] = checkedPics.value.map((item) => item.id);
          delPictures(ids).then((res) => {
            if (res.code == 200) {
              manage();
              getPictureList();
            }
          });
        })
        .catch(() => {});
    }
    // getPictureList();
    return {
      total,
      page,
      editForm,
      editDialogJson,
      visible,
      uploadVisible,
      title,
      picList,
      BASE_URL,
      previewList,
      checkedPics,
      checkAll,
      showCheck,
      setCover,
      manage,
      handleCheckAllChange,
      handleCheckedPicsChange,
      getPictureList,
      submitForm,
      handleCurrentChange,
      delPics,
    };
  },
});
</script>
<style lang="less" scoped>
.picture {
  /deep/.search_area {
    border: none !important;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    .btns {
      display: flex;
      align-items: center;
    }
    .right {
      font-weight: 700;
      font-size: 30px;
      color: #b63529;
      margin-right: 15px;
      cursor: pointer;
    }
  }

  .pic-content {
    display: flex;
    flex-wrap: wrap;
    .pic {
      width: 150px;
      height: 150px;
      margin: 15px;
      border: 1px solid #eaeef2;
      cursor: pointer;
      position: relative;
      .el-checkbox {
        position: absolute;
        height: auto;
        right: 5px;
        top: 5px;
        /deep/.el-checkbox__label {
          display: none !important;
        }
      }
    }
  }
  .footer {
    margin-top: 15px;
    text-align: right;
  }
}
</style>
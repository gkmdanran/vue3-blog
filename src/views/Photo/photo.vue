<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '相册管理' }]"
    class="photo"
  >
    <template #other>
      <el-button
        type="danger"
        style="margin-left: 15px; width: 80px"
        @click="managePhoto"
        size="small"
        >管 理</el-button
      >
      <div class="lists">
        <add-photo @success="getPhotoList" />
        <photo-item
          @delPhoto="delSuccess"
          v-for="photo in photoList"
          :key="photo.id"
          :isDel="isDel"
          :photo="photo"
        ></photo-item>
      </div>
      <div class="footer">
        <el-pagination
          v-model:currentPage="page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import photoItem from "./cmp/photoItem.vue";
import addPhoto from "./cmp/addPhoto.vue";
import { getPhotos } from "@/http/photo";
import { IPhoto } from "./type";
export default defineComponent({
  name: "Photo",
  components: { photoItem, addPhoto },
  setup() {
    const isDel = ref<boolean>(false);
    const total = ref<number>(0);
    const page = ref<number>(1);
    const photoList = ref<IPhoto[]>([]);
    function managePhoto() {
      isDel.value = !isDel.value;
    }
    function handleCurrentChange(val: number) {
      page.value = val;
      getPhotoList();
    }
    function getPhotoList() {
      getPhotos(page.value, 10).then((res) => {
        if (res.code == 200) {
          photoList.value = res.data.list;
          total.value=res.data.total
        }
      });
    }
    function delSuccess() {
      isDel.value = false;
      getPhotoList();
    }
    getPhotoList();
    return {
      isDel,
      total,
      page,
      photoList,
      getPhotoList,
      delSuccess,
      managePhoto,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="less" scoped>
.photo {
  /deep/.search_area {
    border: none !important;
  }
  .lists {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .footer {
    text-align: right;
  }
}
</style>
<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '留言管理' }]"
  >
    <template #search>
      <base-search
        :search-json="searchJson"
        v-model="searchForm"
        @changeForm="changeForm"
        label-width="70px"
      >
      </base-search>
    </template>
    <template #table>
      <base-table
        border
        stripe
        :data="tableData"
        :table-json="tableJson"
        v-model:pagination="pagination"
        @changePagination="searchList"
      >
        <template #topHandler>
          <el-button type="primary" size="small">添加友链</el-button>
        </template>
        <template #photo="scope">
          <el-image
            :fit="container"
            :src="scope.row.photo"
            :preview-src-list="[scope.row.photo]"
            >添加友链</el-image
          >
        </template>
        <template #link="scope">
          <el-link :href="scope.row.link">{{ scope.row.link }}</el-link>
        </template>
        <template #handler="scope">
          <el-button type="text">编辑</el-button>
          <base-button
            type="text"
            :confirm="{ message: '确认删除此链接吗' }"
            @confirmClick="confirmDelLink(scope.row.id)"
            >删除</base-button
          >
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ILink, ISearchForm } from "./type";
import { tableJson, searchJson } from "./linkJson";
import { getLink, delLink } from "@/http/link";
import { IPagination } from "@/base-ui/baseTable/src/type";
export default defineComponent({
  name: "Link",
  components: {},
  setup() {
    let searchForm = ref<ISearchForm>({ title: "", description: "" });
    const tableData = ref<ILink[]>([
      {
        id: "",
        title: "gkm-ui",
        description: "一个基于elementui",
        photo:
          "https://t7.baidu.com/it/u=1807820346,973783503&fm=218&app=125&f=JPEG?w=121&h=75&s=F1C1F91F8F4C4CCC0E7175DA0300B037",
        link: "http://www.baidu.com",
      },
    ]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    function searchList() {
      getLink(
        searchForm.value.title,
        searchForm.value.description,
        pagination.page,
        pagination.size
      ).then((res) => {
        if (res.code == 200) {
          tableData.value = res.data.list;
          pagination.total = res.data.total;
        }
      });
    }
    function changeForm() {
      pagination.page = 1;
      searchList();
    }

    function confirmDelLink(id: number) {
      delLink(id).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    searchList();
    return {
      tableData,
      tableJson,
      searchJson,
      pagination,
      searchForm,
      confirmDelLink,
      changeForm,
      searchList,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

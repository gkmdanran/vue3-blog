<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '标签管理' }]"
  >
    <template #search>
      <base-search
        label-width="70px"
        :search-json="searchJson"
        @changeForm="changeForm"
        v-model="searchForm"
      ></base-search>
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
        <template #tagName="scope">
          <el-tag :type="scope.row.type">{{ scope.row.name }}</el-tag>
        </template>
        <template #count="scope">
          <span
            :style="{
              color: scope.row.count == 0 ? 'red' : 'black',
              fontSize: '22px',
              marginRight: '2px',
            }"
            >{{ scope.row.count }}</span
          >篇
        </template>
        <template #handler="scope">
          <base-button
            type="text"
            @click="checkArticle(scope.row.id)"
            :disabled="scope.row.blogsStrs == ''"
            >查看文章</base-button
          >
          <base-button
            type="text"
            @confirmClick="confirmDelTag(scope.row.id)"
            :confirm="{ message: '你确定删除此标签吗？' }"
            >删除</base-button
          >
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { getTag, delTag } from "@/http/tag";
import { ITagItem, ISearchForm } from "./type";
import { tableJson, searchJson } from "./tagJson";
import { IPagination } from "@/base-ui/baseTable/src/type";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Tag",
  components: {},
  setup() {
    let searchForm = ref<ISearchForm>({ query: "" });
    const tableData = ref<ITagItem[]>([]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    const router = useRouter();
    function searchList() {
      getTag(searchForm.value.query, pagination.page, pagination.size).then((res) => {
        if (res.code == 200) {
          tableData.value = res.data.list;
          pagination.total = res.data.total;
        }
      });
    }
    function confirmDelTag(id: string) {
      delTag(id).then((res) => {
        if (res.code == 200) {
          pagination.page = 1;
          searchList();
        }
      });
    }
    function changeForm() {
      pagination.page = 1;
      searchList();
    }
    function checkArticle(id: string) {
      router.push({
        path: "/article",
        query: {
          tagId: id,
        },
      });
    }

    searchList();
    return {
      tableData,
      tableJson,
      searchJson,
      pagination,
      searchForm,
      changeForm,
      searchList,
      checkArticle,
      confirmDelTag,
    };
  },
});
</script>
<style lang="less" scoped>
.el-tag {
  min-width: 80px;
  text-align: center;
}
</style>

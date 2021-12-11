<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '留言管理' }]"
  >
    <template #search>
      <base-search :form-json="searchJson" @changeForm="changeForm">
      </base-search>
    </template>
    <template #table>
      <base-table
        border
        stripe
        :table-data="tableData"
        :table-json="tableJson"
        v-model:pagination="pagination"
        @changePagination="searchList"
      > 
        <template #topHandler>
          <el-button type="danger" size="small">批量删除</el-button>
        </template>
        <template #chatWay="scope">
          <span>{{
            scope.row.chatWay == "：" ? "暂无" : scope.row.chatWay
          }}</span>
        </template>
        <template #createTime="scope">
          <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { IChatItem, ISearchForm } from "./type";
import { tableJson, searchJson } from "./chatJson";
import { getChat } from "@/http/chat";
import { IPagination } from "@/base-ui/baseTable/src/type";
export default defineComponent({
  name: "Chat",
  components: {},
  setup() {
    let searchForm = reactive<ISearchForm>({ queryPeople: "", queryDate: "" });
    const tableData = ref<IChatItem[]>([]);
    const pagination = reactive<IPagination>({ page: 1, size: 5, total: 0 });
    function searchList() {
      getChat(
        searchForm.queryPeople,
        searchForm.queryDate,
        pagination.page,
        pagination.size
      ).then((res) => {
        if (res.code == 200) {
          tableData.value = res.data.list;
          pagination.total = res.data.total;
        }
      });
    }

    function changeForm(form: ISearchForm) {
      searchForm = form;
      searchList();
    }

    searchList();
    return {
      tableData,
      tableJson,
      searchJson,
      pagination,
      changeForm,
      searchList,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

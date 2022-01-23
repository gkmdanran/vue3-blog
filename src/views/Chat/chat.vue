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
        @selection-change="handleSelectionChange"
      >
        <template #topHandler>
          <base-button
            type="danger"
            size="small"
            :disabled="!delIds.length"
            :confirm="{ message: '确认删除选中的留言吗？' }"
            @confirmClick="confirmDelChats"
            >批量删除</base-button
          >
        </template>
        <template #chatWay="scope">
          <span>{{
            scope.row.chatWay == "：" ? "暂无" : scope.row.chatWay
          }}</span>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { IChatItem, ISearchForm } from "./type";
import { tableJson, searchJson } from "./chatJson";
import { getChat, delChats } from "@/http/chat";
import { IPagination } from "@/base-ui/baseTable/src/type";
import dayjs from "dayjs";
export default defineComponent({
  name: "Chat",
  components: {},
  setup() {
    let searchForm = ref<ISearchForm>({ queryPeople: "", queryDate: "" });
    const tableData = ref<IChatItem[]>([]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    const delIds = ref<string[]>([]);
    function searchList() {
      getChat(
        searchForm.value.queryPeople,
        searchForm.value.queryDate,
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
      searchForm.value = {
        ...form,
        queryDate: form.queryDate
          ? dayjs(form.queryDate).format("YYYY-MM-DD")
          : "",
      };
      pagination.page = 1;
      searchList();
    }
    function handleSelectionChange(rows: IChatItem[]) {
      var arrIds: string[] = [];
      rows.forEach((item) => {
        arrIds.push(item.id);
      });
      delIds.value = arrIds;
    }
    function confirmDelChats() {
      delChats(delIds.value).then((res) => {
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
      delIds,
      searchForm,
      confirmDelChats,
      changeForm,
      searchList,
      handleSelectionChange,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

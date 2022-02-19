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
          <el-button type="primary" size="small" @click="showAdd"
            >添加友链</el-button
          >
        </template>
        <template #href="scope">
          <el-link @click="openUrl(scope.row.href)">{{
            scope.row.href
          }}</el-link>
        </template>
        <template #handler="scope">
          <el-button type="text" @click="showEdit(scope.row.id)"
            >编辑</el-button
          >
          <base-button
            type="text"
            :confirm="{ message: '确认删除此链接吗' }"
            @confirmClick="confirmDelLink(scope.row.id)"
            >删除</base-button
          >
        </template>
      </base-table>
    </template>
    <template #other>
      <base-dialog-form
        :title="title"
        width="400px"
        v-model:dialogForm="linkForm"
        v-model="visible"
        :form-json="dialogJson"
        @success="submitForm"
      ></base-dialog-form>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ILink, ISearchForm } from "./type";
import { tableJson, searchJson, dialogJson } from "./linkJson";
import { getLink, delLink, addLink, editLink, detailLink } from "@/http/link";
import { IPagination } from "@/base-ui/baseTable/src/type";
export default defineComponent({
  name: "Link",
  components: {},
  setup() {
    let searchForm = ref<ISearchForm>({ title: "", description: "" });
    const tableData = ref<ILink[]>([]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    const linkForm = ref<ILink>({
      id: "",
      title: "",
      description: "",
      href: "",
    });
    const title = ref<string>("");
    const visible = ref<boolean>(false);
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
    function openUrl(url: string) {
      window.open(url);
    }
    function showAdd() {
      title.value = "新增友链";
      visible.value = true;
    }
    function showEdit(id: number) {
      detailLink(id).then((res) => {
        if (res.code == 200) {
          linkForm.value = res.data;
          title.value = "编辑友链";
          visible.value = true;
        }
      });
    }
    function submitForm() {
      if (!linkForm.value.id) {
        addLink(linkForm.value).then((res) => {
          if (res.code == 200) {
            visible.value = false;
            searchList();
          }
        });
      } else {
        editLink(linkForm.value).then((res) => {
          if (res.code == 200) {
            visible.value = false;
            searchList();
          }
        });
      }
    }
    searchList();
    return {
      tableData,
      tableJson,
      searchJson,
      pagination,
      searchForm,
      linkForm,
      visible,
      dialogJson,
      title,
      showEdit,
      showAdd,
      submitForm,
      confirmDelLink,
      changeForm,
      searchList,
      openUrl,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

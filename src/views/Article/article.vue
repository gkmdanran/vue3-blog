<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '留言管理' }]"
  >
    <template #search>
      <base-search
        :search-json="searchJson"
        @changeForm="changeForm"
        label-width="80px"
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
          <el-button type="primary" size="small">写博客</el-button>
          <base-button
            type="danger"
            size="small"
            :disabled="!delIds.length"
            :confirm="{ message: '确认删除选中的留言吗？' }"
            @confirmClick="confirmDelArticles"
            >批量删除</base-button
          >
        </template>
        <template #star="scope">
          <span>
            <i
              class="el-icon-star-on"
              style="color: #e47470; font-size: 18px"
            ></i>
            {{
              scope.row.star >= 10000
                ? scope.row.star / 10000 + "w"
                : scope.row.star >= 1000
                ? scope.row.star / 1000 + "k"
                : scope.row.star
            }}
          </span>
        </template>
        <template #status="scope">
          <span>
            {{ scope.row.isHide ? "隐藏" : "展示" }}｜
            {{ scope.row.isTop ? "已置顶" : "未置顶" }}
          </span>
        </template>
        <template #handler="scope">
          <el-button type="text">编辑</el-button>
          <base-button
            type="text"
            :confirm="{ message: '确认删除吗？' }"
            @confirmClick="confirmDelArticle(scope.row)"
            >删除</base-button
          >
          <base-button
            type="text"
            :confirm="{
              message: scope.row.isHide ? '确认显示文章吗？' : '确认隐藏文章吗',
            }"
            @confirmClick="confirmHide(scope.row)"
            >{{ scope.row.isHide ? "显示" : "隐藏" }}</base-button
          >
          <base-button
            type="text"
            :confirm="{
              message: scope.row.isTop
                ? '确认取消置顶文章吗？'
                : '确认置顶文章吗',
            }"
            @confirmClick="confirmTop(scope.row)"
            >{{ scope.row.isTop ? "取消置顶" : "置顶" }}</base-button
          >
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
import { tableJson, searchJson } from "./articleJson";
import {
  getArticle,
  delArticles,
  changeTopStatus,
  changeHideStatus,
} from "@/http/article";
import { IPagination } from "@/base-ui/baseTable/src/type";
import { IArticleItem, ISearchForm } from "./type";
export default defineComponent({
  name: "Article",
  components: {},
  setup() {
    let searchForm = reactive<ISearchForm>({ title: "", tag: -1 });
    const tableData = ref<IArticleItem[]>([
      {
        id: "1",
        title: "1",
        description: "22",
        star: 1000,
        createAt: "2021-10-21",
        tag: [],
        isTop: 0,
        isHide: 1,
      },
    ]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    const delIds = ref<string[]>([]);
    function searchList() {
      getArticle(
        searchForm.title,
        searchForm.tag,
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
      pagination.page = 1;
      searchList();
    }
    function handleSelectionChange(rows: IArticleItem[]) {
      var arrIds: string[] = [];
      rows.forEach((item) => {
        arrIds.push(item.id);
      });
      delIds.value = arrIds;
    }
    function confirmDelArticles() {
      delArticles(delIds.value).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function confirmDelArticle(row: IArticleItem) {
      delArticles([row.id]).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function confirmHide(row: IArticleItem) {
      changeHideStatus(row.id).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function confirmTop(row: IArticleItem) {
      changeTopStatus(row.id).then((res) => {
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
      confirmDelArticles,
      confirmDelArticle,
      confirmHide,
      confirmTop,
      changeForm,
      searchList,
      handleSelectionChange,
    };
  },
});
</script>
<style lang="less" scoped>
</style>

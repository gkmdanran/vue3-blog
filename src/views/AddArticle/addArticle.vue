<template>
  <base-container
    :breadcrumbs="[
      { name: '首页', path: '/home' },
      { name: '文章管理', path: '/article' },
      { name: '添加文章' },
    ]"
    class="add-article"
  >
    <template #other>
      <div class="form-item">
        <div class="label">
          <span class="required">*</span>
          博客标题:
        </div>
        <el-input
          v-model="articleForm.title"
          style="margin-right: 10px"
        ></el-input>
        <div class="btns">
          <el-button type="primary">保存博客</el-button>
          <el-button type="success" @click="verifyForm">发布博客</el-button>
        </div>
      </div>
      <div class="form-item">
        <div class="label">参考链接:</div>
        <el-input
          v-model="articleForm.link"
          style="margin-right: 10px"
        ></el-input>
        <div class="btns"></div>
      </div>
      <div class="form-item start">
        <div class="label"><span class="required">*</span>博客标签:</div>
        <div class="tag-content">
          <add-tag @change="changeTag"></add-tag>
        </div>
        <div class="btns"></div>
      </div>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import AddTag from "./cmp/AddTag/addtag.vue";
import { ITagItem } from "@/views/Tag/type";
import { IArticleForm } from "./type";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Article",
  components: { AddTag },
  setup() {
    const articleForm = reactive<IArticleForm>({
      link: "",
      title: "",
      tagList: [],
      content: "",
      contentText: "",
      mdValue: "",
    });
    function changeTag(list: ITagItem[]) {
      articleForm.tagList = list;
    }
    function verifyForm() {
      if (!articleForm.title)
        return ElMessage({
          type: "warning",
          message: "请填写博客标题",
        });
      if (articleForm.tagList.length == 0)
        return ElMessage({
          type: "warning",
          message: "至少选择一个标签",
        });
      if (!articleForm.mdValue)
        return ElMessage({
          type: "warning",
          message: "请填写博客内容",
        });
      submitForm();
    }
    function submitForm() {
      console.log(articleForm);
    }
    return {
      articleForm,
      changeTag,
      verifyForm,
    };
  },
});
</script>
<style lang="less" scoped>
.add-article {
  /deep/.search_area {
    border: none !important;
  }
  .form-item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    .label {
      width: 90px;
      text-align: right;
      margin-right: 10px;
      .required {
        color: red;
        margin-right: 5px;
      }
    }
    .btns {
      width: 220px;
    }
    .el-input,
    .tag-content {
      flex: 1;
    }
    .tag-content {
      .tag-list {
        width: 100%;
        min-height: 60px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
      .no-tag {
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
      }
    }
  }
  .start {
    align-items: flex-start;
  }
}
</style>

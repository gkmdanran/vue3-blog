<template>
  <div class="add-tag">
    <el-tag
      v-for="(tag, index) in selectTag"
      :key="tag.id"
      :type="tag.type"
      closable
      @close="delSelectTag(index)"
      >{{ tag.name }}</el-tag
    >

    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model.trim="newTagValue"
      size="small"
      style="width: 90px"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
      size="small"
      v-if="!inputVisible && selectTag.length < 3"
      style="width: 90px"
      @click="showInput"
    >
      + 新标签
    </el-button>
    <div class="tag-list">
      <el-tag
        v-for="tag in tagList"
        :key="tag.id"
        :type="tag.type"
        @click="addSelectTag(tag)"
        >{{ tag.name }}</el-tag
      >
      <div class="no-tag" v-if="tagList.length == 0">
        暂无标签可以选择，请先添加～
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from "vue";
import { getTag, addTag } from "@/http/tag";
import { ITagItem } from "@/views/Tag/type";
import { ElInput, ElMessage } from "element-plus";
export default defineComponent({
  name: "AddTag",
  components: {},
  emits: ["change"],
  setup(_, { emit }) {
    const tagList = ref<ITagItem[]>([]);
    const selectTag = ref<ITagItem[]>([]);
    const inputVisible = ref<boolean>(false);
    const newTagValue = ref<string>("");
    const InputRef = ref<InstanceType<typeof ElInput>>();
    function showInput() {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    }
    function handleInputConfirm() {
      if (!newTagValue.value) return (inputVisible.value = false);
      let typeArr: string[] = ["warning", "info", "success", "danger"];
      let random: number = Math.floor(Math.random() * 4);
      addTag({ name: newTagValue.value, type: typeArr[random] }).then((res) => {
        if (res.code == 200) {
          getTagList();
          addSelectTag(res.data);
          inputVisible.value = false;
        }
      });
    }
    function getTagList() {
      getTag("", 1, 99999999).then((res) => {
        if (res.code == 200) {
          tagList.value = res.data.list;
        }
      });
    }
    function delSelectTag(index: number) {
      selectTag.value.splice(index, 1);
      emit("change", selectTag.value);
    }
    function addSelectTag(tag: ITagItem) {
      if (selectTag.value.length >= 3)
        return ElMessage({
          type: "warning",
          message: "最多添加3个标签！",
        });
      if (selectTag.value.find((item) => item.name == tag.name)) return;
      selectTag.value.push(tag);
      emit("change", selectTag.value);
    }

    getTagList();
    return {
      newTagValue,
      tagList,
      selectTag,
      InputRef,
      inputVisible,
      showInput,
      handleInputConfirm,
      delSelectTag,
      addSelectTag,
    };
  },
});
</script>
<style lang="less" scoped>
.add-tag {
  .tag-list {
    width: 100%;
    min-height: 60px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 10px;
  }
  .no-tag {
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    color: #ccc;
  }
  .el-tag {
    width: 100px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
  }
  /deep/.el-tag__close {
    right: -10px;
  }
}
</style>

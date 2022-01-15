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
      clearable
      maxlength="10"
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
import { defineComponent, ref, PropType, nextTick } from "vue";
import { getTag, addTag } from "@/http/tag";
import { ITagItem } from "@/views/Tag/type";
import { ElInput, ElMessage } from "element-plus";
export default defineComponent({
  name: "AddTag",
  components: {},
  props: {
    selectTag: {
      type: Array as PropType<ITagItem[]>,
      default: () => [],
    },
  },
  emits: ["update:selectTag"],
  setup(props, { emit }) {
    const tagList = ref<ITagItem[]>([]);
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
          newTagValue.value = "";
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
      let selectTag: ITagItem[] = [...props.selectTag];
      selectTag.splice(index, 1);
      emit("update:selectTag", selectTag);
    }
    function addSelectTag(tag: ITagItem) {
      if (props.selectTag.length >= 3)
        return ElMessage({
          type: "warning",
          message: "最多添加3个标签！",
        });
      if (props.selectTag.find((item) => item.name == tag.name)) return;
      let selectTag: ITagItem[] = [...props.selectTag];
      selectTag.push(tag);
      emit("update:selectTag", selectTag);
    }

    getTagList();
    return {
      newTagValue,
      tagList,
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

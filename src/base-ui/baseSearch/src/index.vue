<template>
  <el-form class="km-search-form" v-bind="customAttrs">
    <el-row>
      <el-col
        :style="`width:${
          item.layout && typeof item.layout == 'string' && item.layout
        }`"
        v-for="(item, key) in searchJson.searchItems || {}"
        :xl="(item.layout && item.layout.xl) || 4"
        :lg="(item.layout && item.layout.lg) || 6"
        :md="(item.layout && item.layout.md) || 8"
        :sm="(item.layout && item.layout.sm) || 12"
        :xs="(item.layout && item.layout.xs) || 24"
        :key="key"
      >
        <el-form-item
          :label="item.label + '：'"
          :prop="key"
          :style="
            searchJson.itemStyle
              ? searchJson.itemStyle
              : 'margin-right:10px;margin-bottom:15px'
          "
        >
          <el-input
            v-if="item.type === 'input'"
            clearable
            :placeholder="item.placeholder || `请输入${item.label}`"
            style="width: 100%"
            v-bind="item.attrs || {}"
            :model-value="modelValue[key]"
            @update:modelValue="handleValueChange($event, key, item)"
          />
          <el-select
            v-else-if="item.type === 'select'"
            clearable
            :placeholder="item.placeholder || `请选择${item.label}`"
            style="width: 100%"
            v-bind="item.attrs || {}"
            :model-value="modelValue[key]"
            @update:modelValue="handleValueChange($event, key, item)"
          >
            <el-option
              v-for="opt in item.selectOptions"
              v-bind="opt"
              :key="
                opt[(item.selectProps && item.selectProps.label) || 'label']
              "
              :value="
                opt[(item.selectProps && item.selectProps.value) || 'value']
              "
              :label="
                opt[(item.selectProps && item.selectProps.label) || 'label']
              "
            ></el-option>
          </el-select>
          <el-time-picker
            v-else-if="item.type === 'time'"
            clearable
            :placeholder="item.placeholder || `请选择${item.label}`"
            style="width: 100%"
            v-bind="item.attrs || {}"
            :model-value="modelValue[key]"
            @update:modelValue="handleValueChange($event, key, item)"
          >
          </el-time-picker>
          <el-date-picker
            v-else-if="item.type === 'date' || item.type === 'datetime'"
            clearable
            :placeholder="item.placeholder || `请选择${item.label}`"
            style="width: 100%"
            v-bind="item.attrs || {}"
            :model-value="modelValue[key]"
            @update:modelValue="handleValueChange($event, key, item)"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
export default defineComponent({
  name: "baseSearch",
  props: {
    searchJson: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["changeForm", "update:modelValue"],
  components: {},
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const customAttrs = reactive({
      ...instance?.attrs,
    });
    let timeout: number = -1;
    //输入框防抖函数
    function debounce(fn: Function) {
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => {
          fn();
        }, 300);
      };
    }

    function handleValueChange(val: any, key: string, item: any) {
      emit("update:modelValue", { ...props.modelValue, [key]: val });
      const debounceEmit = debounce(() => {
        emit("changeForm", { ...props.modelValue, [key]: val });
      });
      if (item.type == "input") {
        debounceEmit();
      } else {
        emit("changeForm", { ...props.modelValue, [key]: val });
      }
    }
    return {
      customAttrs,
      handleValueChange,
    };
  },
});
</script>
<style lang="less" scoped>
.km-search-form {
  /deep/ .el-form-item__label {
    padding: 0;
  }
  /deep/ .el-form-item {
    margin-bottom: 0px;
  }
}
</style>

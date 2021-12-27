<template>
  <el-form class="km-search-form" v-bind="formJson.formAttributes">
    <el-row>
      <el-col
        v-for="item in formJson.formItems"
        :xl="(item.layout && item.layout.xl) || 4"
        :lg="(item.layout && item.layout.lg) || 6"
        :md="(item.layout && item.layout.md) || 8"
        :sm="(item.layout && item.layout.sm) || 12"
        :xs="(item.layout && item.layout.xs) || 24"
        :key="item.prop"
      >
        <el-form-item
          :label="item.label + '：'"
          :prop="item.prop"
          :style="
            formJson.itemStyle
              ? formJson.itemStyle
              : 'margin-right:10px;margin-bottom:15px'
          "
        >
          <el-input
            v-if="item.type === 'input'"
            clearable
            :placeholder="item.placeholder || `请输入${item.label}`"
            :size="formJson.size || ''"
            style="width: 100%"
            v-bind="item.options || {}"
            :model-value="initForm[`${item.prop}`]"
            @update:modelValue="handleValueChange($event, item)"
          />
          <el-select
            v-else-if="item.type === 'select'"
            clearable
            :placeholder="item.placeholder || `请选择${item.label}`"
            style="width: 100%"
            :size="formJson.size || ''"
            v-bind="item.options || {}"
            :model-value="initForm[`${item.prop}`]"
            @update:modelValue="handleValueChange($event, item)"
          >
            <el-option
              v-for="opt in item.selectOptions"
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
            :size="formJson.size || ''"
            style="width: 100%"
            v-bind="item.options || {}"
            :model-value="initForm[`${item.prop}`]"
            @update:modelValue="handleValueChange($event, item)"
          >
          </el-time-picker>
          <el-date-picker
            v-else-if="item.type === 'date' || 'datetime'"
            clearable
            :placeholder="item.placeholder || `请选择${item.label}`"
            :size="formJson.size || ''"
            style="width: 100%"
            v-bind="item.options || {}"
            :model-value="initForm[`${item.prop}`]"
            @update:modelValue="handleValueChange($event, item)"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "baseSearch",
  props: {
    formJson: {
      type: Object,
      required: true,
    },
  },
  emits: ["changeForm"],
  components: {},
  setup(props, { emit }) {
    //初始化表单
    const initForm = reactive<any>({});
    for (let item of props.formJson.formItems) {
      initForm[item.prop] = "";
    }
    //输入框防抖函数
    function debounce(fn: Function) {
      let timeout: number = 0;
      return function () {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => {
          fn();
        }, 300);
      };
    }
    const debounceEmit = debounce(() => {
      emit("changeForm", initForm);
      console.log(initForm);
    });

    function handleValueChange(val: any, item: any) {
      initForm[`${item.prop}`] = val;
      if (item.type == "input") {
        debounceEmit();
      } else {
        emit("changeForm", initForm);
      }
    }
    return {
      initForm,
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
  .button_area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

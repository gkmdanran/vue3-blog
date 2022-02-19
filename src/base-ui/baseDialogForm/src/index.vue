<template>
  <div>
    <el-dialog
      v-bind="customAttrs"
      :title="title"
      :model-value="modelValue"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="dialogForm"
        :label-width="
          (formJson.formAttributes && formJson.formAttributes.labelWidth) ||
          '80px'
        "
        v-bind="formJson.formAttributes || {}"
      >
        <el-row>
          <el-col
            :span="item.layout || 24"
            v-for="(item, key) in formJson.formItems || {}"
            :key="key"
          >
            <el-form-item
              :label="item.label + '：'"
              :prop="key"
              :style="
                formJson.itemStyle ? formJson.itemStyle : 'margin-bottom:18px'
              "
            >
              <el-input
                v-if="item.type === 'input'"
                clearable
                :placeholder="item.placeholder || `请输入${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              />
              <el-input-number
                v-else-if="item.type === 'inputNumber'"
                clearable
                :placeholder="item.placeholder || `请输入${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              />
              <el-select
                v-else-if="item.type === 'select'"
                clearable
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              >
                <el-option
                  v-for="opt in item.selectOptions || []"
                  v-bind="opt"
                  :key="
                    opt[(item.selectProps && item.selectProps.value) || 'value']
                  "
                  :value="
                    opt[(item.selectProps && item.selectProps.value) || 'value']
                  "
                  :label="
                    opt[(item.selectProps && item.selectProps.label) || 'label']
                  "
                ></el-option>
              </el-select>
              <el-radio-group
                v-else-if="item.type === 'radio' || item.type === 'radioButton'"
                clearable
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              >
                <template v-for="opt in item.selectOptions || []">
                  <el-radio
                    v-if="item.type === 'radio'"
                    v-bind="opt"
                    :key="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    :label="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    >{{
                      opt[
                        (item.selectProps && item.selectProps.label) || "label"
                      ]
                    }}</el-radio
                  >
                  <el-radio-button
                    v-if="item.type === 'radioButton'"
                    v-bind="opt"
                    :key="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    :label="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    >{{
                      opt[
                        (item.selectProps && item.selectProps.label) || "label"
                      ]
                    }}</el-radio-button
                  >
                </template>
              </el-radio-group>
              <el-checkbox-group
                v-else-if="
                  item.type === 'checkbox' || item.type === 'checkboxButton'
                "
                clearable
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              >
                <template v-for="opt in item.selectOptions || []">
                  <el-checkbox
                    v-if="item.type === 'checkbox'"
                    v-bind="opt"
                    :key="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    :label="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    >{{
                      opt[
                        (item.selectProps && item.selectProps.label) || "label"
                      ]
                    }}</el-checkbox
                  >
                  <el-checkbox-button
                    v-if="item.type === 'checkboxButton'"
                    v-bind="opt"
                    :key="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    :label="
                      opt[
                        (item.selectProps && item.selectProps.value) || 'value'
                      ]
                    "
                    >{{
                      opt[
                        (item.selectProps && item.selectProps.label) || "label"
                      ]
                    }}</el-checkbox-button
                  >
                </template>
              </el-checkbox-group>
              <el-time-picker
                v-else-if="item.type === 'time'"
                clearable
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              >
              </el-time-picker>
              <el-date-picker
                v-else-if="item.type === 'date' || item.type === 'datetime'"
                clearable
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                v-bind="item.attrs || {}"
                v-model="dialogForm[key]"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="cancelText" @click="handleClose">{{
            cancelText
          }}</el-button>
          <el-button type="primary" @click="submitForm">{{
            confrimText
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, watch } from "vue";
import { ElForm } from "element-plus";
export default defineComponent({
  inheritAttrs: false,
  name: "baseDialogForm",
  props: {
    title:{
      type:String
    },
    modelValue: {
      required: true,
      type: Boolean,
    },
    dialogForm: {
      required: true,
      type: Object,
    },
    formJson: {
      type: Object,
      required: true,
    },
    confrimText: {
      type: String,
      default: "确 认",
    },
    cancelText: {
      type: String,
      default: "取 消",
    },
  },
  emits: ["update:modelValue", "success", "error",],
  components: {},
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const customAttrs = reactive({
      ...instance?.attrs,
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    watch(
      () => props.modelValue,
      (v) => {
        if (v) {
          formRef.value?.clearValidate();
        }
      }
    );
    function handleClose() {
      formRef.value?.resetFields();
      emit("update:modelValue", false);
    }
    function submitForm() {
      formRef.value?.validate((valid: boolean | undefined) => {
        if (valid) {
          emit("success", { ...props.dialogForm });
        } else {
          emit("error", { ...props.dialogForm });
          return false;
        }
      });
    }

    return {
      customAttrs,
      formRef,
      submitForm,
      handleClose,
    };
  },
});
</script>
<style lang="less" scoped>
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
</style>

<template>
  <div class="htd-form-item" :style="{width:this.Form.labelWidth}">
    <label class="htd-form-item_label">{{label}}</label>
    <div class="htd-form-item_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HtdFormItem",
  inject:['Form'],
  props:{
      label:{
          type:String
      }
  }
};
</script>

<style lang="scss">
.htd-form-item {
  margin-bottom: 25px;
  .htd-form-item_label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .htd-form-item_content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    overflow: hidde;
  }
}
</style>
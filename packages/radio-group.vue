<template>
  <div class="htd-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HtdRadioGroup",
  provide() {
    return {
      RadioGroup: this
    };
  },
  props: {
    // 触发当前组件的input事件,provide与inject
    value: null
  }
};
</script>

<style lang="scss">
</style>
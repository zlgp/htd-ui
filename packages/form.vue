<template>
  <div class="htd-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HtdForm",
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: "80px"
    }
  },
  provide(){
      return{
          Form:this
      }
  }
};
</script>

<style lang="scss">
</style>
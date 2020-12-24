<template>
  <div class="htd-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'HtdCheckboxGroup',
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array
    }
  }
}
</script>
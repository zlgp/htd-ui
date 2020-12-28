<template>
  <div class="htd-rate" @handleKey="handlekey($event)" :currentValue="currentValue">
    <span
      class="htd-rate__item"
      v-for="(item,index) in max"
      :key="index"
      @mouseenter="handleEnter(item)"
      @mouseleave="hadnleLeave(item)"
      :style="{ cursor: disabled ? 'auto' : 'pointer' }"
    >
      <i class="htd-rate__icon htd-icon-mark" :class="{'hover':hoverIndex === item}"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "HtdRate",
  data() {
    return {
      currentValue: -1,
      hoverIndex: -1
    };
  },
  props: {
    //   v-model绑定的值
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    colors: {
      type: [Array, Object],
      default() {
        return ["#F7BA2A", "#F7BA2A", "#F7BA2A"];
      }
    },
  },
  methods: {
    handlekey(e) {
      this.$emit("input", e.target.currentValue);
    },
    handleEnter(value) {
      if (this.rateDisabled) {
        return;
      }
      this.currentValue = value;
      this.hoverIndex = value;
    },

    hadnleLeave() {},
  

   
  }
};
</script>

<style lang="scss">
.htd-rate {
  height: 20px;
  line-height: 1;
}
.htd-rate__item {
  display: inline-block;
  position: relative;
  font-size: 0;
  vertical-align: middle;
}
.htd-rate__icon {
  font-size: 18px;
  margin-right: 6px;
  color: #c0c4cc;
  transition: 0.3s;
  display: inline-block;
  position: relative;
}
.htd-rate__icon.hover {
  transform: scale(1.15);
}
</style>
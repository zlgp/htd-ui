<template>
  <div class="htd-switch" @click="handleClick()" :class="{'is-checked':value}">
    <span class="htd-switch_core" ref="core">
      <span class="htd-switch_button"></span>
    </span>
    <input type="checkbox" class="htd-switch_input" :name="name" ref="input" />
  </div>
</template>

<script>
export default {
  name: "HtdSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.setColor();
    // 控制checkbox
    this.$refs.input.checked = this.value;
  },
  methods: {
    async handleClick() {
      this.$emit("input", !this.value);
      await this.$nextTick();
      this.setColor();
      this.$refs.input.checked = this.value;
    },
    setColor() {
      //    修改开关的颜色
      if (this.activeColor || this.inactiveColor) {
        let color = this.value ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = color;
        this.$refs.core.style.backgroundColor = color;
      }
    }
  }
};
</script>

<style lang="scss">
.htd-switch {
  display: inline-block;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  .htd-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .htd-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
// 选中样式
.is-checked {
  .htd-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    .htd-switch_button {
      transform: translateX(20px);
    }
  }
}
// 隐藏input标签
.htd-switch_input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
</style>
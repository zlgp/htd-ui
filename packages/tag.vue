<template>
  <span
    class="htd-tag htd-tag-light"
    :style="{backgroundColor:color}"
    :class="[`htd-tag--${type}`,`htd-tag--${size}`,`htd-tag--${effect}`,{
        'is-hit':hit
    }]"
    @click="handleClick($event)"
  >
    <slot></slot>
    <i class="htd-tag__close htd-icon-close" v-if="closable" @click="handleClose($event)"></i>
  </span>
</template>

<script>
export default {
  name: "HtdTag",
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    closable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    effect: {
      type: String,
      default: "light",
      validator(val) {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      }
    },
    color: {
      type: String,
      default: ""
    },
    hit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(e) {
      this.$emit("close", e);
    },
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="scss">
.htd-tag {
  background-color: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
.htd-tag + .htd-tag {
  margin-left: 10px;
}
.htd-tag.htd-tag--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.htd-tag.htd-tag--info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.htd-tag.htd-tag--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.htd-tag.htd-tag--danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.htd-tag .htd-icon-close {
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  vertical-align: middle;
  top: -1px;
  right: -5px;
}
.htd-tag .htd-tag__close {
  color: #409eff;
}
.htd-tag.htd-tag--success .htd-tag__close {
  color: #67c23a;
}
.htd-tag.htd-tag--info .htd-tag__close {
  color: #909399;
}

.htd-tag.htd-tag--warning .htd-tag__close {
  color: #e6a23c;
}

.htd-tag.htd-tag--danger .htd-tag__close {
  color: #f56c6c;
}
.htd-tag .htd-tag__close:hover {
  color: #fff;
  background-color: #409eff;
}
.htd-tag.htd-tag--success .htd-tag__close:hover {
  color: #fff;
  background-color: #67c23a;
}
.htd-tag.htd-tag--info .htd-tag__close:hover {
  color: #fff;
  background-color: #909399;
}
.htd-tag.htd-tag--warning .htd-tag__close:hover {
  color: #fff;
  background-color: #e6a23c;
}
.htd-tag.htd-tag--danger .htd-tag__close:hover {
  color: #fff;
  background-color: #f56c6c;
}
.htd-tag--medium {
  height: 28px;
  line-height: 26px;
}
.htd-tag--mini {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}
.htd-tag--mini {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}
.htd-tag--dark {
  background-color: #409eff;
  color: #fff;
}
.htd-tag--dark.htd-tag--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.htd-tag--dark.htd-tag--info {
  background-color: #909399;
  border-color: #909399;
  color: #fff;
}
.htd-tag--dark.htd-tag--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.htd-tag--dark.htd-tag--warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.htd-tag--plain {
  background-color: #fff;
  border-color: #b3d8ff;
  color: #409eff;
}
.htd-tag--plain.htd-tag--success {
  background-color: #fff;
  border-color: #c2e7b0;
  color: #67c23a;
}
.htd-tag--plain.htd-tag--info {
  background-color: #fff;
  border-color: #d3d4d6;
  color: #909399;
}
.htd-tag--plain.htd-tag--danger {
  background-color: #fff;
  border-color: #fbc4c4;
  color: #f56c6c;
}
.htd-tag--plain.htd-tag--warning {
  background-color: #fff;
  border-color: #f5dab1;
  color: #e6a23c;
}
.htd-tag.is-hit {
  border-color: #409eff;
}
.htd-tag.htd-tag--success.is-hit {
    border-color: #67C23A;
}
.htd-tag.htd-tag--info.is-hit {
    border-color: #909399;
}
.htd-tag.htd-tag--danger.is-hit {
    border-color: #F56C6C;
}
.htd-tag.htd-tag--warning.is-hit {
    border-color: #E6A23C;
}
</style>
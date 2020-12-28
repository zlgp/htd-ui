<template>
  <a
    class="htd-link"
    :class="[`htd-link-${type}`,{
      'is-disabled':disabled,
      'is-underline':underline
  }]"
    :href="href"
  >
    <i :class="icon" v-if="icon"></i>
    <span class="htd-link-inner" v-if="$slots.default">
      <slot></slot>
    </span>
    <!-- <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template> -->
  </a>
</template>

<script>
export default {
  name: "HtdLink",
  props: {
    //   类型
    type: {
      type: String,
      default: "default"
    },
    //   是否显示下划线
    underline: {
      type: Boolean,
      default: false
    },
    // 是否禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 跳转的链接
    href: {
      type: String,
      default: ""
    },
    // 图标类名
    icon: {
      type: String,
      default: ""
    }
  },

};
</script>

<style lang="scss">
.htd-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  &:hover {
    color: #409eff;
  }
}

.htd-link-primary {
  color: #409eff;
  &:hover {
    color: #66b1ff;
  }
}
.htd-link-primary {
  color: #409eff;
  &:hover {
    color: #66b1ff;
  }
}

.htd-link-success {
  color: #67c23a;
  &:hover {
    color: #85ce61;
  }
}
.htd-link-warning {
  color: #e6a23c;
  &:hover {
    color: #ebb563;
  }
}
.htd-link-danger {
  color: #f56c6c;
  &:hover {
    color: #f78989;
  }
}
.htd-link-info {
  color: #909399;
  &:hover {
    color: #a6a9ad;
  }
}

.htd-link.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.htd-link.is-underline:hover:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  bottom: 0;
  border-bottom: 1px solid #409eff;
}
.htd-link.htd-link-default:after {
  border-color: #409eff;
}
.htd-link.htd-link-primary.is-underline:hover:after {
  border-color: #409eff;
}
.htd-link.htd-link-success.is-underline:hover:after {
  border-color: #67c23a;
}
.htd-link.htd-link-warning.is-underline:hover:after {
  border-color: #e6a23c;
}
.htd-link.htd-link-danger.is-underline:hover:after {
  border-color: #f56c6c;
}
.htd-link.htd-link-info.is-underline:hover:after {
  border-color: #909399;
}
.htd-link [class*="htd-icon-"] + span {
  margin-left: 5px;
}
</style>
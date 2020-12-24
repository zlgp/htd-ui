<template>
  <div class="htd-input" :class="{'htd-input_suffix':showSuffix}">
    <input
      class="htd-input__inner"
      :type="showPassword?(passwordVisable?'text':'password'):type"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :value="value"
      :class="{
    'is-disabled':disabled
    }"
      @input="handleInput($event)"
    />
    <span class="htd-input_suffix" v-if="showSuffix">
      <i class="htd-input_icon htd-icon-cancel" v-if="clearable && value" @click="clear()"></i>
      <i
        class="htd-input_icon htd-icon-visible"
        :class="{'htd-icon-visible-active':passwordVisable}"
        v-if="showPassword && type=='password'"
        @click="handlePassword()"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "HtdInput",
  data() {
    return{
        passwordVisable: false
    }
  },
  props: {
    //类型
    type: {
      type: String,
      default: "text"
    },
    // 占位符
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    // name属性
    name: {
      type: String,
      default: ""
    },
    // 禁止输入
    disabled: {
      type: Boolean,
      default: false
    },
    // v-model实质是个语法糖,
    // 本质是注册:value="value" 注册@input事件,
    value: {
      type: String,
      default: ""
    },
    // 是否可以清空
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword;
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    // 将内容清空
    clear() {
      this.$emit("input", "");
    },
    handlePassword() {
      this.passwordVisable = !this.passwordVisable;
    }
  }
};
</script>

<style lang="scss">
.htd-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .htd-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
// 后面加suffix的意思是后面如果有后缀的话，触发该样式
.htd-input_suffix {
  .htd-input_inner {
    padding-right: 30px;
  }
  .htd-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.htd-icon-visible-active{
    color: blue !important;
}
</style>
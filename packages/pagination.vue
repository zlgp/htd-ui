<template>
  <div
    class="htd-pagination"
    :class="{'is-background':background}"
    v-show="hideOnSinglePage?(pageCounts==1?false:true):true"
  >
    <button
      class="btn-prev"
      @click="handlePrevClick()"
      :class="{
        'disabled':pageCurrent==1
    }"
    >
      <i class="htd-icon htd-icon-back" v-if="!prevText"></i>
      <i v-if="prevText">{{prevText}}</i>
    </button>
    <ul class="htd-pager">
      <li
        :class="{ 'active': pageCurrent === 1 }"
        v-if="pageCounts > 0"
        class="number"
        @click="handlepageClick(1)"
      >1</li>
      <li
        class="htd-icon btn-quickprev"
        v-if="showPrevMore"
        :class="[quickprevIconClass]"
        @click="handlePrevClick()"
        @mouseenter="onMouseenter('left')"
        @mouseleave="quickprevIconClass = 'htd-icon-checkmore'"
      ></li>
      <li
        class="number"
        v-for="(item,index) in pages"
        :key="index"
        @click="handlepageClick(item)"
        :class="{'active':pageCurrent==item}"
      >{{item}}</li>
      <li
        class="btn-quicknext htd-icon"
        v-if="showNextMore"
        :class="[quicknextIconClass]"
        @click="handleNextClick()"
        @mouseenter="onMouseenter('right')"
        @mouseleave="quicknextIconClass ='htd-icon-checkmore'"
      ></li>
    </ul>
    <button
      class="btn-next"
      @click="handleNextClick()"
      :class="{
        'disabled':pageCurrent==pageCounts
    }"
    >
      <i class="htd-icon htd-icon-next" v-if="!nextText"></i>
      <i v-if="nextText">{{nextText}}</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "HtdPagination",
  data() {
    return {
      pageCurrent: 1,
      quicknextIconClass: "htd-icon-checkmore",
      quickprevIconClass: "htd-icon-checkmore",
      showPrevMore: false,
      showNextMore: false
    };
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    // 总页数
    pageCount: {
      type: Number,
      default: 0
    },
    //
    pagerCount: {
      type: Number,
      default: 7
    },
    background: {
      type: Boolean,
      default: false
    },
    // 只有一页是隐藏分页
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    prevText: {
      type: String,
      default: ""
    },
    nextText: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.getPages();
  },
  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = "htd-icon-checkmore";
    },
    showNextMore(val) {
      if (!val) this.quicknextIconClass = "htd-icon-checkmore";
    }
  },
  computed: {
    pageCounts() {
      if (this.pageCount == 0) {
        return Math.ceil(this.total / this.pageSize);
      } else {
        return this.pageCount;
      }
    },
    pages() {
      //   获取总页数
      const pagerCount = this.pagerCount;
      //    一般页码
      //   当前页
      const currentPage = Number(this.pageCurrent);
      //   总页数
      const pageCount = Number(this.pageCounts);

      const array = [];
      //上一个显示


      if (this.showPrevMore && !this.showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      }
      //   下一个显示
      else if (!this.showPrevMore && this.showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      }
      //   都显示的时候
      else if (this.showPrevMore && this.showNextMore) {
        // const offset = Math.floor(pagerCount / 2) - 1;

        for (let i = currentPage; i <= this.pageCounts ; i++) {
          array.push(i);
        }
      } else {
        // 第一次进来的渲染,都为false
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      return array;
    }
  },

  methods: {
    getPages() {
      const pagerCount = this.pagerCount;
      //    一半页码,减一是剪掉固定的1
      const halfPagerCount = (pagerCount - 1) / 2;
      //   当前页
      const currentPage = Number(this.pageCurrent);
      //   总页数
      const pageCount = Number(this.pageCounts);
      //    如果总页数超过页码数就显示省略号
      if (pageCount > pagerCount) {
        //  如果当前页大于总页码减去一半就显示上一个的省略号
        if (currentPage > pagerCount - halfPagerCount) {
          this.showPrevMore = true;
        }
        //  如果当前页小于总页码减去一半就显示下一个的省略号
        if (currentPage < pagerCount - halfPagerCount) {
          this.showNextMore = true;
        }
      }
    },
    onMouseenter(direction) {
      if (direction === "left") {
        this.quickprevIconClass = "htd-icon-back";
      } else {
        this.quicknextIconClass = "htd-icon-next";
      }
    },
    //	currentPage 改变时会触发
    handlepageClick(item) {
      this.pageCurrent = item;
      if (!isNaN(this.pageCurrent)) {
        if (this.pageCurrent < 1) {
          this.pageCurrent = 1;
        }
        if (this.pageCurrent > this.pageCounts) {
          this.pageCurrent = this.pageCounts;
        }
      }
      this.$emit("current-change", this.pageCurrent);
    },
    handlePrevClick() {
      let pagerCountOffset = this.pagerCount - 2;
      if (this.pageCurrent != 1) {
        this.pageCurrent = this.pageCurrent - pagerCountOffset;
        this.getPages();
      }
      if (!isNaN(this.pageCurrent)) {
        if (this.pageCurrent < 1) {
          this.pageCurrent = 1;
        }
        if (this.pageCurrent > this.pageCounts) {
          this.pageCurrent = this.pageCounts;
        }
      }

      this.$emit("prev-click", this.pageCurrent);
    },
    handleNextClick() {
      let pagerCountOffset = this.pagerCount - 2;
      if (this.pageCurrent < this.pageCounts) {
        // this.pageCurrent++;
        this.pageCurrent = this.pageCurrent + pagerCountOffset;
        this.getPages();
      }
      if (!isNaN(this.pageCurrent)) {
        if (this.pageCurrent < 1) {
          this.pageCurrent = 1;
        }
        if (this.pageCurrent > this.pageCounts) {
          this.pageCurrent = this.pageCounts;
        }
      }
      this.$emit("next-click", this.pageCurrent);
    }
  }
};
</script>

<style lang="scss">
.htd-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  &::before {
    display: table;
    content: "";
  }
  &::after {
    display: table;
    content: "";
  }
}
.htd-pagination .btn-prev {
  padding-right: 12px;
  background: 50% no-repeat;
  background-size: 16px;
}
.htd-pagination button {
  border: none;
  padding: 0 6px;
  background: transparent;
}
.htd-pagination button {
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  box-sizing: border-box;
  outline: none;
}
.htd-pagination .btn-prev .htd-icon {
  display: block;
  font-size: 12px;
  font-weight: 700;
}
.htd-pagination .btn-next {
  padding-left: 12px;
}
.htd-pagination .btn-next,
.htd-pagination .btn-prev {
  background: 50% no-repeat;
  background-size: 16px;
  background-color: #fff;
  cursor: pointer;
  margin: 0;
  color: #303133;
}
.htd-pagination .btn-next .htd-icon,
.htd-pagination .btn-prev .htd-icon {
  display: block;
  font-size: 12px;
  font-weight: 700;
}
.htd-pager {
  user-select: none;
  list-style: none;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding: 0;
  margin: 0;
}
.htd-pager li {
  padding: 0 4px;
  background: #fff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
}
.htd-pager li.active {
  color: #409eff;
  cursor: default;
}
.htd-pagination button:hover {
  color: #409eff;
}
.htd-pagination button.disabled {
  color: #c0c4cc;
  background-color: #fff;
  cursor: not-allowed;
}

.htd-pagination.is-background .btn-next,
.htd-pagination.is-background .btn-prev {
  padding: 0;
}
.htd-pagination.is-background .btn-next,
.htd-pagination.is-background .btn-prev,
.htd-pagination.is-background .htd-pager li {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
}

.htd-pagination.is-background .htd-pager li:not(.disabled).active {
  background-color: #409eff;
  color: #fff;
}
</style>
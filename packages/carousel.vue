<template>
  <div
    class="htd-carousel"
    :class="[`htd-carousel--${direction}`]"
    @mouseenter="handleMouseEnter()"
    @mouseleave.stop="handleMouseLeave()"
  >
    <div class="htd-carousel__container" :style="{height}">
      <button
        type="button"
        class="htd-carousel__arrow htd-carousel__arrow--left"
        v-show="(arrow === 'always' || hover)"
        @click="throttledArrowClick(activeIndex-1)"
      >
        <i class="htd-icon-back"></i>
      </button>
      <button
        type="button"
        class="htd-carousel__arrow htd-carousel__arrow--right"
        v-show="(arrow === 'always' || hover)"
        @click="throttledArrowClick(activeIndex+1)"
      >
        <i class="htd-icon-next"></i>
      </button>
      <slot></slot>
    </div>

    <ul class="htd-carousel__indicators" :class="[`htd-carousel__indicators--${direction}`]">
      <li
        class="htd-carousel__indicator"
        :class="[` htd-carousel__indicator--${direction}`,{
            'is-active':index==activeIndex
        }]"
        v-for="(item,index) in items"
        :key="index"
        @click="handleTrigger(index)"
        @mouseenter="throttledIndicatorHover(index)"
      >
        <button class="htd-carousel__button"></button>
      </li>
    </ul>
  </div>
</template>

<script>
// 节流包
import { throttle } from "throttle-debounce";
export default {
  provide() {
    return {
      carousel: this
    };
  },
  name: "HtdCarousel",
  props: {
    // 走马灯的方向、
    direction: {
      type: String,
      default: "horizontal"
    },
    // 高度
    height: {
      type: String,
      default: ""
    },
    // 指示灯触发方式
    trigger: {
      type: String,
      default: "hover"
    },
    // 切换箭头的显示时机
    arrow: {
      type: String,
      default: "hover"
    },
    // 初始状态激活的索引
    initialIndex: {
      type: Number,
      default: 0
    },
    type: String,
    interval: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hover: false,
      activeIndex: 0,
      items: []
    };
  },
  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });
  },
  mounted() {
    // 获取子组件的item的个数,渲染指示灯的个数
    this.updateItems();
    // 自动切换指示灯
    this.$nextTick(() => {
      // 初始开始运行
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },
  methods: {
    //获取子组件里item的个数
    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === "HtdCarouselItem"
      );
    },
    // 点击
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    // 开始
    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    // 暂停
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 点击箭头,让指示灯跟着箭头动
    setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        // console.warn("[Element Warn][Carousel]index must be an integer.");
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        //    如果这俩个相等就是loop为false,那么到最后一个要回到第一个重新开始
        this.resetItemPosition(oldIndex);
      }
    },
    // 重置幻灯片的位置
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },
    handleIndicatorHover(index) {
      if (this.trigger === "hover" && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    },
    // 点击指示灯
    handleTrigger(index) {
      if (this.trigger === "click" && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    },
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    }
  },
  watch: {
    //   初始化幻灯片,从0开始
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    // 监听activeIndex的变化
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit("change", val, oldVal);
      }
    }
  }
};
</script>

<style lang="scss">
.htd-carousel--horizontal {
  overflow-x: hidden;
  background-color: #000000;
}
.htd-carousel {
  position: relative;
}
.htd-carousel__container {
  text-align: center;
  position: relative;
}

.htd-carousel__arrow--left {
  left: 16px;
}
.htd-carousel__arrow--right {
  right: 16px;
}
.htd-carousel__arrow {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px;
}

.htd-carousel__indicators--horizontal {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.htd-carousel__indicators {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 2;
}
.htd-carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px;
}
.htd-carousel__indicator {
  background-color: transparent;
  cursor: pointer;
}

.htd-carousel__button {
  display: block;
  opacity: 0.48;
  width: 30px;
  height: 2px;
  background-color: #fff;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: 0.3s;
}
.htd-carousel__indicator.is-active button {
  opacity: 1;
}
</style>
<template>
  <div
    class="htd-carousel__item"
    v-show="ready"
    :class="[{
      'is-animating':animating ,
      'is-active':active
  }]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HtdCarouselItem",
  inject: ["carousel"],
  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  },
  created() {
    this.carousel && this.carousel.updateItems();
  },
  methods: {
    translateItem(index, activeIndex, oldIndex) {
      const parentType = this.carousel.type;
      if (parentType !== "card" && oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex;
      }
      this.active = index === activeIndex;
      this.ready = true;
    }
  }
};
</script>

<style lang="scss">
.htd-carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}
.htd-carousel__item.is-animating {
  transition: transform 0.4s ease-in-out;
}
.htd-carousel__item.is-active {
  z-index: 2;
}
</style>
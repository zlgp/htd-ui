<template>
  <div id="app">
    <div id="nav">
      <htd-button type="success">成功按钮</htd-button>
      <htd-switch v-model="value"></htd-switch>
      <htd-pagination   :page-count="20">

      </htd-pagination>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true
    };
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

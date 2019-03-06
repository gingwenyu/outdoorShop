<template>
  <div id="app">    
    <router-view v-if="isRouterAlive"></router-view>    
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },   
  },
}

</script>

<style lang='scss'>
@import "./assets/all";

</style>

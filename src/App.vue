<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import $ from 'jquery'
  import 'jquery-migrate'
  import 'bootstrap'
  import 'dropzone'
  import 'lodash'
  import 'chosen-js'
  import Vue from 'vue'

  const bus = new Vue()
  Object.defineProperty(Vue.prototype, '$bus', {
    get () {
      return this.$root.bus
    }
  })
  export default new Vue({
    name: 'app',
    data: {
      bus
    }
  })
</script>

<style lang="postcss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~dropzone/dist/basic.css';
  @import '~dropzone/dist/dropzone.css';
  @import '~font-awesome/css/font-awesome.css';
  @import '~chosen-js/chosen.css';
  @import './../static/css/main.pcss';
</style>

<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    안녕하세요! 장호원시외버스터미널입니다.
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div>
    <app-header />
    <router-view></router-view>
    <player />
    <auth />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import Auth from './components/Auth.vue';
import Introduction from './components/Introduction.vue';
import MainContent from './components/MainContent.vue';
import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
    Introduction,
    MainContent,
    Player
  },
  created() {
    this.$store.dispatch('init_login')
  }
}
</script>
<style>

</style>

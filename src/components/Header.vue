<template>
<header id="header" class="bg-purple-500">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4" :to="{name: 'home'}" exact-active-class="no-active">Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{name: 'manage'}">Manage</router-link>
            </li>
            <li>
              <a @click.prevent="signout" class="px-2 text-white" href="#">Logout</a>
            </li>
            <li>
              <router-link :to="{name: 'about'}" class="px-2 text-white" >About </router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapMutations,mapState} from 'vuex';

    export default {
        name: 'AppHeader',
        methods: {
          ...mapMutations(['toggleAuthModal']),
          signout() {
            this.$store.dispatch('signout');
            if(this.$route.meta.requiresAuth) {
              this.$router.push({
                name: 'home'
              })
            }
          }
        },
        computed: {
          ...mapState(['userLoggedIn'])
        }
    }
</script>

<style>

</style>
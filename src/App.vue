<template>
  <span
    data-test="logged-user"
    class="flex justify-end mt-1 mr-12 text-lg text-green-700"
  >{{ loggedUser }}</span>

  <nav class='ml-8 text-blue-500'>
    <RouterLink
      data-test="home-link"
      to="/"
      class="text-xl"
    >Home</RouterLink>

    <RouterLink
      data-test="login-link"
      to="/login"
      class="ml-8 text-xl"
    >Login</RouterLink>

    <RouterLink
      data-test="register-link"
      to="/register"
      class="ml-8 text-xl"
    >Register</RouterLink>
  </nav>

  <div class='flex flex-col items-center'>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGameStore } from './stores/GameStore'

const gameStore = useGameStore()
const { loggedUser } = storeToRefs(gameStore)
</script>

<template>
  <h1 class='mt-8 mb-4 ml-8 text-2xl text-blue-500'>Create an Account</h1>

  <p>
    <input
      data-test="email-input"
      v-model="email"
      type="email"
      placeholder="Email"
      class="block p-2 ml-8 mb-4 text-xl border rounded-md placeholder:italic placeholder:text-slate-400 min-w-96 border-slate-300 focus:outline-none focus:border-sky-500"
    />
  </p>

  <p>
    <input
      data-test="password-input"
      v-model="password"
      type="password"
      placeholder="Password"
      class="block p-2 ml-8 mb-4 text-xl border rounded-md placeholder:italic placeholder:text-slate-400 min-w-96 border-slate-300 focus:outline-none focus:border-sky-500"
    />
  </p>

  <p class="h-6 text-red-500 first-letter:capitalize">
    {{ errMsg && errMsg }}
  </p>

  <p>
    <button
      data-test="submit-button"
      @click="register"
      :disabled="!email || !password"
      class="mt-5 ml-8 mr-12 p-2 text-xl min-w-24 rounded-md border-slate-300 bg-blue-500 text-white disabled:opacity-50"
    >Submit</button>

  </p>

</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/GameStore'

const router = useRouter()
const gameStore = useGameStore()
const { loggedUser } = storeToRefs(gameStore)

const email = ref('')
const password = ref('')
const errMsg = ref('')

const register = () => {
  const auth = getAuth()

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      gameStore.loggedUser = auth.currentUser.displayName || auth.currentUser.email
      router.push('/')
    })
    .catch(error => {
      errMsg.value = error.code.split('/')[1].replaceAll('-', ' ')
    })
}
</script>
